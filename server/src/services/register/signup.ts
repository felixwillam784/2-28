import { Customer } from '../../db/models';

const signupUser = async ({
  email, password, fullName, phoneNumber,
}) => {
  const userInfo: any = await Customer.create({
    email,
    password,
    fullName,
    phoneNumber,
  });
  return userInfo.id;
};
export default signupUser;
