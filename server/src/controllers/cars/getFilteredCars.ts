import { Request, Response, NextFunction } from 'express';

// const createError = require('http-errors');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getFilteredCars = (req:Request, res:Response, next:NextFunction) => {
  const { test } = req.query;
  res.status(200).send(test);
};

export default getFilteredCars;
