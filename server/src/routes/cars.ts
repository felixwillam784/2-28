import { Router } from 'express';
import ExpressWrapper from './ExpressWrapper';
import { getFilteredCars, getCarsById } from '../controllers';

const carsRouter = Router();

carsRouter.get('/cars', ExpressWrapper(getFilteredCars));
carsRouter.get('/cars/:id', ExpressWrapper(getCarsById));

export default carsRouter;
