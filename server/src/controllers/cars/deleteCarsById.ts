import { Request } from 'express';
import { deleteCars } from '../../services';

const deleteCarsById = async (req:Request) => {
  const { id } = req.params;
  const del = await deleteCars(id);
  return { status: 200, msg: 'done!', data: del };
};
export default deleteCarsById;
