import { Router } from 'express';
import { loginController, signupController } from '../controllers';
import ExpressWrapper from './ExpressWrapper';

const loginRouter = Router();

loginRouter.post('/login', ExpressWrapper(loginController));
loginRouter.post('/signup', ExpressWrapper(signupController));
export default loginRouter;
