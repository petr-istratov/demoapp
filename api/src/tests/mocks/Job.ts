import { Job } from '../../models/Job';

export const createJob = async ({ id, contractId, price = 200 }) => {
  await Job.create({
    id,
    description: 'work',
    price,
    paid: false,
    paymentDate: null,
    contractId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const destroyJob = async ({ id }) => {
  await Job.destroy({ where: { id } });
};
