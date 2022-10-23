import {
  Request, Response, NextFunction,
} from 'express';

const jwt = require('jsonwebtoken');

const verifyToken = (role:string) => async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { token } = req.cookies;
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    res.locals.user = decoded;

    if (role !== decoded.role) {
      throw Error();
    }
    next();
  } catch (err) {
    res.status(401).send({ status: 401, msg: 'Unauthorized' });
  }
  next();
};

export default verifyToken;
