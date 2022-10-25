import { Router } from 'express';
import ExpressWrapper from './ExpressWrapper';
import { getFilteredCars, getCarsById, getCarsDetails } from '../controllers';

const carsRouter = Router();

carsRouter.get('/cars', ExpressWrapper(getFilteredCars));
carsRouter.get('/cars/:id', ExpressWrapper(getCarsById));
carsRouter.get('/admin/cars', ExpressWrapper(getCarsDetails));

export default carsRouter;
