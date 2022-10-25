import { Request } from 'express';
import bcrypt from 'bcryptjs';
import { createError } from 'http-errors';
import { loginSchema } from '../validation';
import { loginQuery } from '../services';
import { generateToken } from '../helpers';

const loginController = async (req:Request) => {
  const { email, password } = req.body;
  await loginSchema.validate({ email, password });
  const result:{ password:string, id:number, fullName:string } = await loginQuery({ email });
  if (!result) {
    throw createError(400, 'user not found');
  }
  const isCompare = await bcrypt.compare(password, result.password);
  if (!isCompare) {
    throw createError(400, 'password not match');
  }
  const token = await generateToken({ userId: result.id, role: 'user' });
  return {
    status: 200, msg: 'done', data: email, token,
  };
};

export default loginController;
