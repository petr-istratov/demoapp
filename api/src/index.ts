import './lib/dotenv';

import sequelize from './lib/database';
import logger from './lib/logger';
import app from './lib/server';

const port = process.env.PORT || 3000;

(async () => {
  await sequelize.sync();
  logger.info('⊙ Successfully connected to Sequelize ✅');

  app.listen(port, () => logger.info(`Server is running on port ${port}`));
})();

function shutDown() {
  logger.info(`Closing down 🌛`);
  logger.info(`Waiting for Sequelize...`);
  sequelize.close().then(() => {
    logger.info(`Sequelize has closed down. See ya! 👋`);
    // eslint-disable-next-line no-process-exit
    process.exit(0);
  });
}

process.on('SIGINT', shutDown);
process.on('SIGTERM', shutDown);
