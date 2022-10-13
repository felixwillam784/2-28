import express, { Express, Request, Response } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';

const app: Express = express();

app.set('port', process.env.PORT || 4000);

app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

export default app;
