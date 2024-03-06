const config: any = {
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_NAME,
  storage: process.env.DB_STORAGE,
  define: {
    underscored: true,
  },
  logging: false,
};

module.exports = config;
