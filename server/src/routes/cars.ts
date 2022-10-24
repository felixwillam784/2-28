import { Router } from 'express';
import ExpressWrapper from './ExpressWrapper';
import { getFilteredCars, getCarsById, updateCar } from '../controllers';
import authMiddleware from '../middlewares/authMiddleware';

const carsRouter = Router();

carsRouter.get('/cars', ExpressWrapper(getFilteredCars));
carsRouter.get('/cars/:id', ExpressWrapper(getCarsById));
carsRouter.put('/cars/:id', authMiddleware('admin'), ExpressWrapper(updateCar));
export default carsRouter;
