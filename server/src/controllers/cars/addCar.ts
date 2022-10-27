import { Request } from 'express';
import { addCarService } from '../../services';
import { addCarSchema } from '../../validation';

const addCar = async (req: Request, res) => {
  const { body } = req;
  const { userId } = res.locals.user;
  const data = { ...body, customerId: userId };
  await addCarSchema.validate(body);
  const result = await addCarService(data);
  console.log(result);

  return { message: 'successfully', status: 201, data: result };
};

export default addCar;
