import {
  RequestHandler,
} from 'express';

import { Controllers } from '../interfaces';

const ExpressWrapper = (fn: Controllers): RequestHandler => async (req, res, next) => {
  try {
    const {
      status, data = null, msg = null, token = null,
    } = await fn(req, res, next);
    if (token) {
      res.cookie('token', token).status(status).json({ msg, data });
    } else {
      res.status(status).json({ msg, data });
    }
  } catch (error: any) {
    // may need change
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.errors });
    } else if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Server Error', err: error });
    }
  }
};
export default ExpressWrapper;
