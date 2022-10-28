import { Request } from 'express';
import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import AdminLoginSchema from '../validation/AdminLoginSchema';
import { generateToken } from '../helpers';
import { checkAdmin } from '../services';

const AdminLogin = async (req:Request) => {
  const { username, password } = req.body;
  AdminLoginSchema.validate({ username, password });
  const result:{ id:number, password:string, username:string } = await checkAdmin({ username });
  if (!result) {
    throw createError(400, 'wrong user name or password');
  }
  const isCompare = await bcrypt.compare(password, result.password);

  if (!isCompare) {
    throw createError(400, 'password is not X');
  }
  const token = await generateToken({ userId: result.id, role: 'admin' });

  return {
    status: 200,
    data:
    {
      id: result.id, username: result.username, role: 'admin',
    },
    token,
  };
};
export default AdminLogin;
