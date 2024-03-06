import sequelize from '../lib/database';

const finish = async () => {
  await sequelize.close();
};

export default finish;
