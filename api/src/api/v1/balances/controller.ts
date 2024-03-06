import httpContext from 'express-http-context';
import { ForbiddenError, InternalServerError, NotFoundError } from 'routing-controllers';
import { cast, col, fn, Op } from 'sequelize';

import { CONTRACT_STATUSES } from '../../../constants/contract';
import { PROFILE_TYPES } from '../../../constants/profile';
import logger from '../../../lib/logger';
import { Contract } from '../../../models/Contract';
import { Job } from '../../../models/Job';
import { Profile } from '../../../models/Profile';

interface ProfileTotalToPay extends Profile {
  totalToPay: number;
}

export const deposit = async (userId: string, amount: number) => {
  const profile = httpContext.get('profile');

  if (profile.id !== userId) return new ForbiddenError('You can deposit only on your account');
  if (profile.type !== PROFILE_TYPES.CLIENT) return new ForbiddenError('Only clients can deposit');

  try {
    const record = await Profile.findOne({
      attributes: ['balance', [fn('sum', cast(col('clientContracts->jobs.price'), 'decimal')), 'totalToPay']],
      where: {
        id: userId,
      },
      include: {
        model: Contract,
        attributes: [],
        as: 'clientContracts',
        where: {
          [Op.or]: [{ status: CONTRACT_STATUSES.IN_PROGRESS }, { status: CONTRACT_STATUSES.NEW }],
          clientId: profile.id,
        },
        include: [
          {
            model: Job,
            attributes: [],
            where: {
              [Op.or]: [{ paid: null }, { paid: false }],
            },
          },
        ],
      },
    });

    if (!record) return new NotFoundError('Your profile does not have active contracts or jobs');

    const plainRecord = record.get({ plain: true }) as ProfileTotalToPay;
    const maxToPay = plainRecord.totalToPay * 0.25;
    if (amount > maxToPay) return new ForbiddenError(`Your amount exceeds allowed maximum of ${maxToPay} per deposit`);
    const clientsBalance = plainRecord.balance;

    await Profile.update({ balance: clientsBalance + amount, updatedAt: new Date() }, { where: { id: userId } });

    return { message: 'Succesfully deposited' };
  } catch (error) {
    logger.error(error);
    throw new InternalServerError('Failed to deposit');
  }
};
