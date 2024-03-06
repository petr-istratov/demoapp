import httpContext from 'express-http-context';
import invokeMap from 'lodash/invokeMap';
import { InternalServerError, NotAcceptableError, NotFoundError } from 'routing-controllers';
import { Op } from 'sequelize';

import { CONTRACT_STATUSES } from '../../../constants/contract';
import sequelize from '../../../lib/database';
import logger from '../../../lib/logger';
import { Contract } from '../../../models/Contract';
import { Job } from '../../../models/Job';
import { Profile } from '../../../models/Profile';

export const payForJob = async (id: string) => {
  const profile = httpContext.get('profile');
  let transaction;

  try {
    const job = await Job.findOne({
      where: {
        id,
        [Op.or]: [{ paid: null }, { paid: false }],
      },
      include: {
        model: Contract,
        where: {
          status: CONTRACT_STATUSES.IN_PROGRESS,
          clientId: profile.id,
        },
        include: [
          {
            model: Profile,
            as: 'client',
          },
          {
            model: Profile,
            as: 'contractor',
          },
        ],
      },
    });

    if (!job) return new NotFoundError('The job is not payable');

    // Check balance

    const clientsBalance = job.contract.client.balance;
    const contractorsBalance = job.contract.contractor.balance;
    const price = job.price;

    if (clientsBalance < price) return new NotAcceptableError('Client balance is insufficient');

    transaction = await sequelize.transaction();

    await job.contract.client.update({ balance: clientsBalance - price, updatedAt: new Date() }, { transaction });
    await job.contract.contractor.update(
      { balance: contractorsBalance + price, updatedAt: new Date() },
      { transaction }
    );
    await job.update({ paid: true, paymentDate: new Date(), updatedAt: new Date() }, { transaction });

    await transaction.commit();

    return { record: job?.get({ plain: true }) || undefined, message: 'Succesfully payed for the job' };
  } catch (error) {
    transaction && (await transaction.rollback());
    logger.error(error);
    throw new InternalServerError('Failed to pay for the job');
  }
};

export const getUnpaidJobs = async (limit: number, offset: number) => {
  const profile = httpContext.get('profile');
  try {
    const records = invokeMap(
      await Job.findAll({
        where: {
          [Op.or]: [{ paid: null }, { paid: false }],
        },
        include: {
          model: Contract,
          where: {
            status: CONTRACT_STATUSES.IN_PROGRESS,
            [Op.or]: [{ clientId: profile.id }, { contractorId: profile.id }],
          },
        },
        limit,
        offset,
      }),
      'get',
      { plain: true }
    );

    return (records.length > 0 && records) || undefined;
  } catch (error) {
    logger.error(error);
    throw new InternalServerError('Failed to get unpaid jobs');
  }
};
