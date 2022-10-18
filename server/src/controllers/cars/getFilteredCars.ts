import { Request, Response, NextFunction } from 'express';
import { getCars } from '../../services';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getFilteredCars = async (req:Request, res:Response, next:NextFunction) => {
  const {
    brand = '',
    model = '',
    year = '',
    maxPrice = '',
    fuel = '',
    mileage = '',
    goodPrice = '',
    state = '',
    page = 1,
  } = req.query;

  const result = await getCars({
    brand, model, year, maxPrice, fuel, mileage, goodPrice, state, page,
  });

  if (result.rows.length === 0) {
    return { status: 200, msg: 'Not found', data: result };
  }
  return { status: 200, msg: 'done!', data: result };
};

export default getFilteredCars;
