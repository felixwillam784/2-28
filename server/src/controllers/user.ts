import { Request } from 'express';
import { verifyToken } from '../helpers';
import { findUserById } from '../services';

const userController = async (req:Request) => {
  const { token } = req.cookies;
  if (token) {
    const decoded:any = await verifyToken(token);
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
  return { status: 401 };
};

export default userController;
