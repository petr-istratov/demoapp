import invokeMap from 'lodash/invokeMap';
import pick from 'lodash/pick';
import { InternalServerError, NotAcceptableError, NotFoundError } from 'routing-controllers';
import { cast, col, fn, literal, Op } from 'sequelize';

import { PROFILE_TYPES } from '../../../constants/profile';
import logger from '../../../lib/logger';
import { Contract } from '../../../models/Contract';
import { Job } from '../../../models/Job';
import { Profile } from '../../../models/Profile';

export const getBestProfession = async (start: Date, end: Date) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (endDate.getTime() <= startDate.getTime()) return new NotAcceptableError('End date must be after start Date');

  try {
    const records = invokeMap(
      await Profile.findAll({
        attributes: ['profession', [fn('sum', cast(col('contractorContracts->jobs.price'), 'decimal')), 'paidTotal']],
        where: {
          type: PROFILE_TYPES.CONTRACTOR,
        },
        include: {
          model: Contract,
          attributes: [],
          as: 'contractorContracts',
          include: [
            {
              model: Job,
              attributes: [],
              where: {
                paid: true,
                [Op.and]: [{ paymentDate: { [Op.gte]: startDate } }, { paymentDate: { [Op.lte]: endDate } }],
              },
            },
          ],
        },
        group: ['profession'],
        order: [['paidTotal', 'DESC']],
      }),
      'get',
      { plain: true }
    );

    if (!records || records.length === 0 || !records[0].paidTotal) return new NotFoundError('Records were not found');

    return records[0];
  } catch (error) {
    logger.error(error);
    throw new InternalServerError('Failed to get best profession');
  }
};

export const getBestClients = async (start: Date, end: Date, limit: number = 2) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (endDate.getTime() <= startDate.getTime()) return new NotAcceptableError('End date must be after start Date');

  try {
    const records = invokeMap(
      await Profile.findAll({
        attributes: [
          'id',
          [literal('"Profile".id'), 'profileId'],
          [fn('format', '%s %s', col('firstName'), col('lastName')), 'fullName'],
          [fn('sum', cast(col('clientContracts->jobs.price'), 'decimal')), 'paid'],
        ],
        where: {
          type: PROFILE_TYPES.CLIENT,
        },
        include: {
          model: Contract,
          attributes: [],
          as: 'clientContracts',
          include: [
            {
              model: Job,
              attributes: [],
              where: {
                paid: true,
                [Op.and]: [{ paymentDate: { [Op.gte]: startDate } }, { paymentDate: { [Op.lte]: endDate } }],
              },
            },
          ],
        },
        group: ['profileId'],
        order: [['paid', 'DESC']],
        limit,
        subQuery: false,
      }),
      'get',
      { plain: true }
    );

    if (!records || records.length === 0) return new NotFoundError('Records were not found');

    return records.map((item) => pick(item, ['id', 'fullName', 'paid']));
  } catch (error) {
    logger.error(error);
    throw new InternalServerError('Failed to get best clients');
  }
};
