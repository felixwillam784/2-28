import { Request, Response, NextFunction } from 'express';
import getCarsQuery from '../../db/queries/carsQueries/getCarsQuery';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getFilteredCars = async (req:Request, res:Response, next:NextFunction) => {
  const {
    brand = null,
    model = null,
    year = null,
    maxPrice = null,
    fuel = null,
    mileage = null,
    goodPrice = null,
  } = req.query;

  const result = await getCarsQuery({
    brand, model, year, maxPrice, fuel, mileage, goodPrice,
  });

  if (result.length === 0) {
    return { status: 200, msg: 'Not found' };
  }
  return { status: 200, data: result };
};

export default getFilteredCars;
