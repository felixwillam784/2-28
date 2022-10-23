import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { updateCarServes } from '../../services/cars';
import updateCarSchema from '../../helpers/updateCarSchema';

const updateCars = async (req: Request, res: Response, next:NextFunction) => {
  const { body } = req;
  const { id } = req.params;
  updateCarSchema.validate(body).catch((err) => {
    next(createError(404, err.errors));
  });
  const result = await updateCarServes(body, id);
  return { status: 200, msg: 'done!', data: result };
};

export default updateCars;
