import { Customer } from '../db/models';

const findUser = async ({ email }) => {
  const userInfo:any = await Customer.findOne({ where: { email } });
  return userInfo;
};
export default findUser;
