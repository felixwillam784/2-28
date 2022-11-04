import { Request } from 'express';

import createError from 'http-errors';
import * as yup from 'yup';
import { sendEmail } from '../helpers';
import {
  addCarService,
  deleteCars,
  getCarInfo,
  getCarsDetailsQuery,
  getCars,
  updateCarServes,
  findUserById,
  getCarByCustomerId,
  addImagesService,
} from '../services';
import { addCarSchema, updateCarSchema } from '../validation';

const addCar = async (req: Request, res) => {
  const { body } = req;
  const { userId } = res.locals.user;
  const data = { ...body, customerId: userId };
  await addCarSchema.validate(body);
  const result = await addCarService(data);

  return { msg: 'successfully', status: 201, data: result };
};
//-------------------------------------------------------
const schema = yup.object({
  id: yup.number().integer().required(),
});
const deleteCarsById = async (req:Request) => {
  const { id } = req.params;
  await schema.validate({ id });
  const result = await deleteCars(id);
  if (result === 0) {
    throw createError(400, 'car not found');
  }
  return { status: 200, msg: 'done!', data: result };
};
//-------------------------------------------------------
const getCarsById = async (req: Request) => {
  const { id } = req.params;
  const schema2 = yup.object({
    id: yup.number().integer().required(),
  });
  await schema2.validate({ id });
  const result = await getCarInfo(id);
  return { status: 200, msg: 'done!', data: result };
};
//-------------------------------------------------------

const getCarsDetails = async (req: Request) => {
  const {
    state = '',
    page = 1,
  } = req.query;
  if (!state) {
    throw createError(400, 'not found');
  }
  const result = await getCarsDetailsQuery(state, page);
  if (result.rows.length === 0) {
    return { status: 200, msg: 'Not found', data: result };
  }
  return { status: 200, msg: 'done', data: result };
};
//-------------------------------------------------------

const getFilteredCars = async (req: Request) => {
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

//-------------------------------------------------------

const updateCars = async (req: Request) => {
  const { body } = req;
  const { id } = req.params;
  await updateCarSchema.validate(body);

  const result = await updateCarServes(body, id);
  return { status: 200, msg: 'done!', data: result };
};
const buyCar = async (req, res) => {
  const { state, id } = req.body;
  const { userId } = res.locals.user;
  const carInfo = await getCarInfo(id);
  if (carInfo[0].state === 'on-market') {
    await updateCarServes({ state }, id);
    const result:{ email: string, fullName: string } = await findUserById({ id: userId });
    await sendEmail(result);
    return { status: 200, msg: 'successfully' };
  }
  throw createError(400, 'car not available to sell');
};
const getUserCars = async (req, res) => {
  const { userId } = res.locals.user;
  const result = await getCarByCustomerId(userId);
  return {
    status: 200,
    msg: 'successfully',
    data: result,
  };
};

const addImages = async () => {
  addImagesService();
};

export {
  getFilteredCars,
  getCarsById,
  updateCars,
  deleteCarsById,
  getCarsDetails,
  addCar,
  buyCar,
  getUserCars,
  addImages,
};
