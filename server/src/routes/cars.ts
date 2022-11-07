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
  buyCar,
  getUserCars,
  addCarImagesController,
} from '../controllers';

const carsRouter = Router();

carsRouter.get('/', ExpressWrapper(getFilteredCars));
carsRouter.get('/dashboard', authMiddleware('admin'), ExpressWrapper(getCarsDetails));
carsRouter.delete('/:id', authMiddleware('admin'), ExpressWrapper(deleteCarsById));
carsRouter.put('/:id', authMiddleware('admin'), ExpressWrapper(updateCars));
carsRouter.post('/', authMiddleware('user'), ExpressWrapper(addCar));
carsRouter.patch('/buy', authMiddleware('user'), ExpressWrapper(buyCar));
carsRouter.get('/user', authMiddleware('user'), ExpressWrapper(getUserCars));
carsRouter.get('/:id', ExpressWrapper(getCarsById));
carsRouter.post('/images/:id', authMiddleware('admin'), ExpressWrapper(addCarImagesController));

export default carsRouter;
