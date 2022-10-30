import { Request } from 'express';
import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import { loginSchema, signupSchema } from '../validation';
import {
  findUser, checkEmail, signupUser, findUserById, checkAdmin,
} from '../services';
import { generateToken, verifyToken } from '../helpers';
import AdminLoginSchema from '../validation/AdminLoginSchema';
//----------------------------------------------------------------

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

const signupController = async (req:Request) => {
  const {
    fullName, email, password, phoneNumber,
  } = req.body;
  await signupSchema.validate({
    fullName, email, password, phoneNumber,
  });
  const result = await checkEmail({ email });

  if (result.length) {
    throw createError(400, 'this email is registered');
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await signupUser({
    email, password: hashedPassword, phoneNumber, fullName,
  });
  const token = await generateToken({ userId: user, role: 'user' });
  return { status: 201, msg: 'done!', token };
};

const userController = async (req:Request) => {
  const { token } = req.cookies;
  if (token) {
    const decoded:any = await verifyToken(token);
    if (decoded.role === 'user') {
      const result:{ fullName: string,
        email:string,
        id: number } = await findUserById({ id: decoded.userId });
      return {
        status: 200,
        data: {
          id: result.id, email: result.email, userName: result.fullName, role: 'user',
        },
      };
    }
    return { status: 200, data: { role: 'admin', id: decoded.id } };
  }
  return { status: 401 };
};

const loginAdmin = async (req:Request) => {
  const { username, password } = req.body;
  await AdminLoginSchema.validate({ username, password });
  const result:{ id:number, password:string, username:string } = await checkAdmin({ username });
  if (!result) {
    throw createError(400, 'wrong username or password');
  }
  const isCompare = await bcrypt.compare(password, result.password);

  if (!isCompare) {
    throw createError(400, 'wrong username or password');
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

export {
  loginController,
  signupController,
  userController,
  loginAdmin,
};
