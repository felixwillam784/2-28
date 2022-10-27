import { Request } from 'express';
import bcrypt from 'bcryptjs';
import createError from 'http-errors';
import { signupSchema } from '../validation';
import { generateToken } from '../helpers';
import { checkEmail, signupUser } from '../services';

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
export default signupController;
