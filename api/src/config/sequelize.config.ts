import path from 'path';
import { Dialect } from 'sequelize';

const sequelizeConfig: { dialect: Dialect; storage: string; database: string; models: string[]; logging: boolean } = {
  dialect: (process.env.DB_DIALECT as Dialect) || 'sqlite',
  database: process.env.DB_NAME || 'demo-db',
  storage: process.env.DB_STORAGE || './database.sqlite3',
  models: [path.join(__dirname, '..', '/models')],
  logging: false,
};

export default sequelizeConfig;
