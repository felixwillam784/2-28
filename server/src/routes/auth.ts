import { Router } from 'express';
import { loginController } from '../controllers';
import userController from '../controllers/user';
import ExpressWrapper from './ExpressWrapper';

const loginRouter = Router();

loginRouter.post('/login', ExpressWrapper(loginController));
loginRouter.get('/user', ExpressWrapper(userController));

export default loginRouter;
