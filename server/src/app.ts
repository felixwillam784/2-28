import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { join } from 'path';
import router from './routes/routes';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(40).json('{ createError }');
});
// eslint-disable-next-line n/handle-callback-err, @typescript-eslint/no-unused-vars
app.use('*', (error:ErrorRequestHandler, req:Request, res:Response, next:NextFunction) => {
  res.status(500).json('internal server error');
});
export default app;
