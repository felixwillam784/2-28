import { Router, Request, Response } from 'express';
import carsRouter from './cars';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/', authMiddleware('admin'), (req: Request, res: Response) => {
  res.send('hello');
});

router.use(carsRouter);

export default router;
