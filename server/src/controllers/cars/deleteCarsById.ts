import { Request, Response } from 'express';
import * as yup from 'yup';
import { deleteCars } from '../../services';

const schema = yup.object({
  id: yup.number().integer().required(),
});
const deleteCarsById = async (req:Request, res:Response) => {
  const { id } = req.params;
  await schema.validate({ id });
  const result = await deleteCars(id);
  // console.log(result, 'sss');
  // eslint-disable-next-line eqeqeq
  if (result == 0) {
    res.json({ msg: 'not found' });
  }
  return { status: 200, msg: 'done!', data: result };
};
export default deleteCarsById;
