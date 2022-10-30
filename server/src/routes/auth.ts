import { Router } from 'express';
import { userController, loginController, signupController } from '../controllers';

import ExpressWrapper from './ExpressWrapper';

const auth = Router();
auth.post('/signup', ExpressWrapper(signupController));
auth.post('/login', ExpressWrapper(loginController));
auth.get('/user', ExpressWrapper(userController));
auth.get('/logout', (req, res) => { res.clearCookie('token').status(200).end(); });

export default auth;
