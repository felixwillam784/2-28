import { Router, Request, Response } from 'express';
import getFilteredCars from '../controllers/cars/getFilteredCars';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

router.get('/cars', getFilteredCars);

export default router;
