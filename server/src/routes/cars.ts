import { Router } from 'express';
import ExpressWrapper from './ExpressWrapper';
import authMiddleware from '../middlewares/authMiddleware';
import {
  getFilteredCars,
  getCarsById,
  updateCars,
  deleteCarsById,
  getCarsDetails,
  addCar,
} from '../controllers';

const carsRouter = Router();

carsRouter.get('/', ExpressWrapper(getFilteredCars));
carsRouter.get('/dashboard', authMiddleware('admin'), ExpressWrapper(getCarsDetails));
carsRouter.get('/:id', ExpressWrapper(getCarsById));
carsRouter.delete('/:id', authMiddleware('admin'), ExpressWrapper(deleteCarsById));
carsRouter.put('/:id', authMiddleware('admin'), ExpressWrapper(updateCars));
carsRouter.post('/', authMiddleware('user'), ExpressWrapper(addCar));

export default carsRouter;
