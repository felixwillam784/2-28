import { Request, Response, NextFunction } from 'express';
import { getCarById } from '../../services';

const getCarsId = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const reus = await getCarById(id);

  return { status: 200, msg: 'done!', data: reus };
};

export default getCarsId;
