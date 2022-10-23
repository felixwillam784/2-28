import { Router } from 'express';
import ExpressWrapper from './ExpressWrapper';
import { getFilteredCars, getCarsById, updateCar } from '../controllers';

const carsRouter = Router();

carsRouter.get('/cars', ExpressWrapper(getFilteredCars));
carsRouter.get('/cars/:id', ExpressWrapper(getCarsById));
carsRouter.put('/cars/:id', ExpressWrapper(updateCar));
export default carsRouter;
