import { Router } from 'express';
import { loginController } from '../controllers';
import ExpressWrapper from './ExpressWrapper';

const loginRouter = Router();

loginRouter.post('/login', ExpressWrapper(loginController));

export default loginRouter;
