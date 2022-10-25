import { Customer } from '../db/models';

const loginQuery = async ({ email }) => {
  const userInfo:any = await Customer.findOne({ where: { email } });
  return userInfo;
};
export default loginQuery;
