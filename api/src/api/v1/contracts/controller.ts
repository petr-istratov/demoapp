import httpContext from 'express-http-context';
import invokeMap from 'lodash/invokeMap';
import { InternalServerError } from 'routing-controllers';
import { Op } from 'sequelize';

import { CONTRACT_STATUSES } from '../../../constants/contract';
import logger from '../../../lib/logger';
import { Contract } from '../../../models/Contract';

export const getContract = async (id: string) => {
  const profile = httpContext.get('profile');

  try {
    const record = await Contract.findOne({
      where: {
        id,
        [Op.or]: [{ clientId: profile.id }, { contractorId: profile.id }],
      },
    });
    return (record && record.get({ plain: true })) || undefined;
  } catch (error) {
    logger.error(error);
    throw new InternalServerError('Failed to get contract');
  }
};

export const getContractsList = async (limit: number, offset: number) => {
  const profile = httpContext.get('profile');

  try {
    const records = invokeMap(
      await Contract.findAll({
        where: {
          status: { [Op.ne]: CONTRACT_STATUSES.TERMINATED },
          [Op.or]: [{ clientId: profile.id }, { contractorId: profile.id }],
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
    throw new InternalServerError('Failed to get contracts');
  }
};
