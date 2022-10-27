import { Router } from 'express';
import { loginController, signupController } from '../controllers';
import userController from '../controllers/user';
import ExpressWrapper from './ExpressWrapper';

const auth = Router();
auth.post('/signup', ExpressWrapper(signupController));
auth.post('/login', ExpressWrapper(loginController));
auth.get('/user', ExpressWrapper(userController));

export default auth;
