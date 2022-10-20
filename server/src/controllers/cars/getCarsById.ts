import { Request } from 'express';
import { getCarInfo } from '../../services';

const getCarsById = async (req: Request) => {
  const { id } = req.params;

  const result = await getCarInfo(id);

  return { status: 200, msg: 'done!', data: result };
};

export default getCarsById;
