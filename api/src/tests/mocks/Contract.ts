import { Contract } from '../../models/Contract';

export const createContract = async ({ id, clientId, contractorId }) => {
  await Contract.create({
    id,
    terms: 'bla bla bla',
    status: 'IN_PROGRESS',
    clientId,
    contractorId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const destroyContract = async ({ id }) => {
  await Contract.destroy({ where: { id } });
};
