import express, {
  Express,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';

import createError from 'http-errors';

const app:Express = express();

app.get('/', (req:Request, res:Response, next: NextFunction) => {
  next(createError(401, 'Please login to view this page.'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(40).json('{ createError }');
});
// eslint-disable-next-line n/handle-callback-err, @typescript-eslint/no-unused-vars
app.use('*', (error:ErrorRequestHandler, req:Request, res:Response, next:NextFunction) => {
  res.status(500).json('internal server error');
});

export default app;
