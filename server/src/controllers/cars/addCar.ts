import { Request } from 'express';
import { addCarService } from '../../services';
import { updateCarSchema } from '../../validation';

const addCar = async (req: Request) => {
  const customerId = req.cookies.id;
  const { body } = req;
  await updateCarSchema.validate(body, customerId);

  const result = await addCarService(body, customerId);
  return { message: 'successfully', status: 200, data: result };
};

export default addCar;
