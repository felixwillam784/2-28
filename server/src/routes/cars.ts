import { Router } from 'express';
import ExpressWrapper from './ExpressWrapper';
import { getFilteredCars, getCarsById, deleteCarsById } from '../controllers';
import authMiddleware from '../middlewares/authMiddleware';

const carsRouter = Router();

carsRouter.get('/cars', ExpressWrapper(getFilteredCars));
carsRouter.get('/cars/:id', ExpressWrapper(getCarsById));
carsRouter.delete('/cars/:id', authMiddleware('admin'), ExpressWrapper(deleteCarsById));
export default carsRouter;
