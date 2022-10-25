import { Router } from 'express';
import ExpressWrapper from './ExpressWrapper';
<<<<<<< HEAD
import {
  getFilteredCars, getCarsById, updateCars, getCarsDetails,
} from '../controllers';
=======
>>>>>>> main
import authMiddleware from '../middlewares/authMiddleware';
import {
  getFilteredCars, getCarsById, updateCar, deleteCarsById,
} from '../controllers';

const carsRouter = Router();

carsRouter.get('/', ExpressWrapper(getFilteredCars));
carsRouter.get('/', ExpressWrapper(getCarsById));
<<<<<<< HEAD
carsRouter.put('/:id', authMiddleware('admin'), ExpressWrapper(updateCars));
carsRouter.get('/admin/cars', ExpressWrapper(getCarsDetails));
=======
carsRouter.delete('/:id', authMiddleware('admin'), ExpressWrapper(deleteCarsById));
carsRouter.put('/:id', authMiddleware('admin'), ExpressWrapper(updateCar));
>>>>>>> main
export default carsRouter;
