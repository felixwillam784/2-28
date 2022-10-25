import { Router } from 'express';
import ExpressWrapper from './ExpressWrapper';
import {
  getFilteredCars, getCarsById, updateCars, getCarsDetails,
} from '../controllers';
import authMiddleware from '../middlewares/authMiddleware';

const carsRouter = Router();

carsRouter.get('/', ExpressWrapper(getFilteredCars));
carsRouter.get('/', ExpressWrapper(getCarsById));
carsRouter.put('/:id', authMiddleware('admin'), ExpressWrapper(updateCars));
carsRouter.get('/admin/cars', ExpressWrapper(getCarsDetails));
export default carsRouter;
