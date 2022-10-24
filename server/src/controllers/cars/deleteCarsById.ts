import { Request } from 'express';
import * as yup from 'yup';
import createError from 'http-errors';
import { deleteCars } from '../../services';

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
export default deleteCarsById;
