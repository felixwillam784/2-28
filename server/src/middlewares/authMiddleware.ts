/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Request, Response, NextFunction,
} from 'express';

import createError from 'http-errors';
import { JwtPayload } from 'jsonwebtoken';

import { verifyToken } from '../helpers';

const authMiddleware = (role:'admin' | 'user') => async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { token } = req.cookies;

    const decoded = await verifyToken(token);
    res.locals.user = decoded;

    if (role !== (decoded as JwtPayload).role) {
      next(createError(401, 'Unauthorized'));
    }
    next();
  } catch (err) {
    next(createError(401, 'Unauthorized'));
  }
};

export default authMiddleware;
