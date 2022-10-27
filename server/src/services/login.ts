import { Customer } from '../db/models';

const findUser = async ({ email }) => {
  const userInfo:any = await Customer.findOne({ where: { email } });
  return userInfo;
};

const findUserById = async ({ id }) => {
  const userInfo:any = await Customer.findOne({ where: { id } });
  return userInfo;
};
export { findUser, findUserById };
