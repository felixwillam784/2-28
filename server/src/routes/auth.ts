import { Router } from 'express';
import { loginController, signupController, AdminLogin } from '../controllers';
import userController from '../controllers/user';
import ExpressWrapper from './ExpressWrapper';

const auth = Router();
auth.post('/signup', ExpressWrapper(signupController));
auth.post('/login', ExpressWrapper(loginController));
auth.post('/admin/login', ExpressWrapper(AdminLogin));
auth.get('/user', ExpressWrapper(userController));

export default auth;
