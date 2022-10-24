import { Request } from 'express';
import { updateCarServes } from '../../services/cars';
import updateCarSchema from '../../validation/updateCarSchema';

const updateCars = async (req: Request) => {
  const { body } = req;
  const { id } = req.params;
  await updateCarSchema.validate(body);

  const result = await updateCarServes(body, id);
  return { status: 200, msg: 'done!', data: result };
};

export default updateCars;
