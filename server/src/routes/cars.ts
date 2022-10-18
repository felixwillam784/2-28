import { Router } from 'express';
import ExpressWrapper from './ExpressWrapper';
import { getFilteredCars } from '../controllers';

const carsRouter = Router();

carsRouter.get('/cars', ExpressWrapper(getFilteredCars));

export default carsRouter;
