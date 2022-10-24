import { Router } from 'express';
import ExpressWrapper from './ExpressWrapper';
import authMiddleware from '../middlewares/authMiddleware';
import {
  getFilteredCars, getCarsById, updateCar, deleteCarsById,
} from '../controllers';

const carsRouter = Router();

carsRouter.get('/cars', ExpressWrapper(getFilteredCars));
carsRouter.get('/cars/:id', ExpressWrapper(getCarsById));
carsRouter.delete('/cars/:id', authMiddleware('admin'), ExpressWrapper(deleteCarsById));
carsRouter.put('/cars/:id', authMiddleware('admin'), ExpressWrapper(updateCar));
export default carsRouter;
