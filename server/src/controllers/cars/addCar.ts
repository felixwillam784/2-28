import { Request } from 'express';
import { addCarService } from '../../services';
import { addCarSchema } from '../../validation';

const addCar = async (req: Request, res) => {
  // const { token } = req.cookies;
  const { body } = req;
  const { userId } = res.locals.user;
  console.log(res.locals.user.userId);

  await addCarSchema.validate(body);
  const result = await addCarService(body, userId);
  return { message: 'successfully', status: 200, data: result };
};

export default addCar;
