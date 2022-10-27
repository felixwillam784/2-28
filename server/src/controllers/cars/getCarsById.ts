import { Request } from 'express';
import * as yup from 'yup';
import createError from 'http-errors';
import { getCarInfo } from '../../services';

const getCarsById = async (req: Request) => {
  const { id } = req.params;
  const schema = yup.object({
    id: yup.number().integer().required(),
  });
  await schema.validate({ id });
  const result:any = await getCarInfo(id);
  if (result[0].state !== 'on-market') {
    throw createError(400, 'bad request');
  }
  return { status: 200, msg: 'done!', data: result };
};

export default getCarsById;
