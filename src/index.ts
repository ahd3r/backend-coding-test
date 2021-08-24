import * as express from 'express';
import * as dotenv from 'dotenv';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { createConnection } from 'typeorm';

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

export const app: express.Express = express();

app.use(cors({ origin: '*' }));
app.use(helmet());
app.use(express.json());

app.use(logReq);

app.get('/health', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  (res as any).body = { message: 'API' };
  next();
});

app.use('/rides', rideRouter);

app.use(responseHandler);
app.use(errorHandler);

createConnection({
  type: 'sqlite',
  synchronize: true,
  database: process.env.DB_NAME as string,
  logging: false,
  entities: [RidesEntity]
})
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
