import { Router } from 'express';
import ExpressWrapper from './ExpressWrapper';
import authMiddleware from '../middlewares/authMiddleware';
import {
  getFilteredCars, getCarsById, updateCar, deleteCarsById, getCarsDetails,
} from '../controllers';

const carsRouter = Router();

carsRouter.get('/', ExpressWrapper(getFilteredCars));
carsRouter.get('/:id', ExpressWrapper(getCarsById));
carsRouter.get('/dashboard', authMiddleware('admin'), ExpressWrapper(getCarsDetails));
carsRouter.delete('/:id', authMiddleware('admin'), ExpressWrapper(deleteCarsById));
carsRouter.put('/:id', authMiddleware('admin'), ExpressWrapper(updateCar));
export default carsRouter;
