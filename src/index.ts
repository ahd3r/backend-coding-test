import * as express from 'express';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { createConnection } from 'typeorm';
import * as swaggerUi from 'swagger-ui-express';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: 'production.env' });
} else if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: 'development.env' });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: 'test.env' });
}

import { errorHandler, logReq, responseHandler } from './utils/middleware';
import { router as rideRouter } from './routers/ride.router';
import { RidesEntity } from './models/rides';

let swaggerDocument: any;
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  swaggerDocument = require('../documentation/swagger-prod.json');
} else if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  swaggerDocument = require('../documentation/swagger-dev.json');
}

export const createApp = async () => {
  const app: express.Express = express();
  app.use(cors({ origin: '*' }));
  app.use(helmet());
  app.use(express.json());

  app.use(logReq);

  if (swaggerDocument) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const paths: any = require('../documentation/paths.json');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const components: any = require('../documentation/components.json');

    app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup({ ...swaggerDocument, paths, components })
    );
  }
  app.get('/health', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    (res as any).body = { message: 'API' };
    next();
  });

  app.use('/rides', rideRouter);

  app.use(responseHandler);
  app.use(errorHandler);

  try {
    await createConnection({
      type: 'sqlite',
      synchronize: true,
      database: process.env.DB_NAME as string,
      logging: false,
      entities: [RidesEntity]
    });

    return app;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

if (__filename === require.main?.filename) {
  createApp()
    .then((app) => {
      app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
      });
    })
    .catch((e) => {
      throw e;
    });
}
