import { Router, Request, Response } from 'express';
import ExpressWrapper from './ExpressWrapper';
import getFilteredCars from '../controllers/cars/getFilteredCars';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

router.get('/cars', ExpressWrapper(getFilteredCars));

export default router;
