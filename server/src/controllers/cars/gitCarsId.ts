import { Request, Response, NextFunction } from 'express';
import { getCarById } from '../../services';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCarsId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const reus = await getCarById(id);

  return { status: 200, msg: 'done!', data: reus };
};

export default getCarsId;
