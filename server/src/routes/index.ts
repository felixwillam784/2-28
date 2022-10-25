import { Router, Request, Response } from 'express';
import loginRouter from './auth';
import carsRouter from './cars';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

router.use('/cars', carsRouter);
router.use('/auth', loginRouter);

export default router;
