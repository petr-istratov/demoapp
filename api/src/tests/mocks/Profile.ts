import { Profile } from '../../models/Profile';

export const createProfile = async ({ id, balance = 1000.5, type = 'CLIENT' }) => {
  await Profile.create({
    id,
    firstName: 'test',
    lastName: 'test',
    profession: 'test',
    balance,
    type,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

export const destroyProfile = async ({ id }) => {
  await Profile.destroy({ where: { id } });
};
