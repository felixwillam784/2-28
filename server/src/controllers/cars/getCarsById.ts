import { Request } from 'express';
import * as yup from 'yup';
import { getCarInfo } from '../../services';

const getCarsById = async (req: Request) => {
  const { id } = req.params;
  const schema = yup.object({
    id: yup.number().integer().required(),
  });
  await schema.validate({ id });
  const result = await getCarInfo(id);

  return { status: 200, msg: 'done!', data: result };
};

export default getCarsById;
