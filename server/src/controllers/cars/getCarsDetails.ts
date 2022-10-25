import { Request } from 'express';
import createError from 'http-errors';
import { getCarsCustomInfo } from '../../services';

const getCarsDetails = async (req: Request) => {
  const {
    state = '',
    page = 1,
  } = req.query;
  if (!state) {
    throw createError(400, 'not found');
  }
  const result = await getCarsCustomInfo(state, page);
  if (result.rows.length === 0) {
    return { status: 200, msg: 'Not found', data: result };
  }
  return { status: 200, msg: 'done', data: result };
};

export default getCarsDetails;
