import { Router, Request, Response } from 'express';
import carsRouter from './cars';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

router.use(carsRouter);

export default router;
