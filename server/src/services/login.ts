import { Customer } from '../db/models';

const loginServices = async ({ email }) => {
  const userLogin:any = await Customer.findOne({ where: { email } });
  return userLogin;
};
export default loginServices;
