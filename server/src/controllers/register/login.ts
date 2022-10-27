import { Request } from 'express';
import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import { loginSchema } from '../../validation';
import { findUser } from '../../services';
import { generateToken } from '../../helpers';

const loginController = async (req:Request) => {
  const { email, password } = req.body;
  await loginSchema.validate({ email, password });
  const result:{ password:string, id:number, fullName:string,
    email: string } = await findUser({ email });
  if (!result) {
    throw createError(400, 'wrong email or password');
  }
  const isCompare = await bcrypt.compare(password, result.password);
  if (!isCompare) {
    throw createError(400, 'wrong email or password');
  }
  const token = await generateToken({ userId: result.id, role: 'user' });
  return {
    status: 200,
    data: {
      id: result.id, email: result.email, userName: result.fullName, role: 'user',
    },
    token,
  };
};

export default loginController;
