import { Request } from 'express';
import { loginSchema } from '../validation';
import { loginServices } from '../services';
import { generateToken, passwordCompare } from '../helpers';

const loginController = async (req:Request) => {
  const { email, password } = req.body;
  await loginSchema.validate({ email, password });
  const result:{ password:string, id:number, fullName:string } = await loginServices({ email });
  if (!result?.password.length) {
    return { status: 200, msg: 'done', data: { msg: 'user not found' } };
  }
  const isCompare = await passwordCompare(password, result.password);
  if (!isCompare) {
    return { status: 200, msg: 'done', data: 'password not match' };
  }
  const token = await generateToken(result);
  console.log(token, 'token ');
  return {
    status: 200, msg: 'done', data: email, token,
  };
};

export default loginController;
