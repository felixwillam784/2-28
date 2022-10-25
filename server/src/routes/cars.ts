import { Router } from 'express';
import ExpressWrapper from './ExpressWrapper';
import authMiddleware from '../middlewares/authMiddleware';
import {
  getFilteredCars, getCarsById, updateCar, deleteCarsById,
} from '../controllers';

const carsRouter = Router();

carsRouter.get('/', ExpressWrapper(getFilteredCars));
carsRouter.get('/', ExpressWrapper(getCarsById));
carsRouter.delete('/cars/:id', authMiddleware('admin'), ExpressWrapper(deleteCarsById));
carsRouter.put('/:id', authMiddleware('admin'), ExpressWrapper(updateCar));
export default carsRouter;
