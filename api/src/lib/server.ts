import cors from 'cors';
import express, { Express, Request, RequestHandler, Response } from 'express';
import httpContext from 'express-http-context';
import path from 'path';
import { useExpressServer } from 'routing-controllers';

import { GlobalErrorHandler } from '../middleware/globalErrorHandler';

const app: Express = express();

app.use(cors() as RequestHandler);
app.use(express.json({ limit: '5mb' }));
app.use(httpContext.middleware);

app.get('/', (request: Request, response: Response) => response.redirect('/api/v1'));

useExpressServer(app, {
  routePrefix: '/api/v1',
  controllers: [path.join(__dirname, '..', '/api/v1/**/router.ts')],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false,
});

export default app;
