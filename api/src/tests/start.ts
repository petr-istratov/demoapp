import '../lib/dotenv';

import express from 'express';
import httpContext from 'express-http-context';
import { useExpressServer } from 'routing-controllers';

import sequelize from '../lib/database';
import { GlobalErrorHandler } from '../middleware/globalErrorHandler';

const start = async (controllers) => {
  const server = express();
  server.use(express.json());
  server.use(httpContext.middleware);
  useExpressServer(server, {
    routePrefix: '/api/v1',
    controllers,
    middlewares: [GlobalErrorHandler],
    defaultErrorHandler: false,
  });
  await sequelize.sync();

  return server;
};

export default start;
