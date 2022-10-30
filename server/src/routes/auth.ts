import { Router } from 'express';
import {
  userController, loginController, signupController, loginAdmin,
} from '../controllers';

import ExpressWrapper from './ExpressWrapper';

const auth = Router();
auth.post('/signup', ExpressWrapper(signupController));
auth.post('/login', ExpressWrapper(loginController));
auth.post('/admin/login', ExpressWrapper(loginAdmin));
auth.get('/user', ExpressWrapper(userController));

export default auth;
