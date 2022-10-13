import { join } from 'path';

import express, { Express, Request, Response } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();
const app: Express = express();

app.set('port', process.env.PORT || 4000);

app.use([compression(),
  express.json(),
  cookieParser(),
  express.urlencoded({ extended: false })]);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1', router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

export default app;
