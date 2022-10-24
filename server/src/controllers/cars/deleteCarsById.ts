import { Request } from 'express';
import * as yup from 'yup';

const deleteCarsById = async (req:Request) => {
  const { id } = req.params;
  const schema = yup.object({
    id: yup.number().integer().required(),
  });
  await schema.validate({ id });
  return { status: 200, msg: 'done!' };
};
export default deleteCarsById;
