import { Admin, Customer } from '../db/models';

const checkEmail = async ({ email }) => {
  const getEmail = await Customer.findAll({
    where: {
      email,
    },
    attributes: ['email'],
  });
  return getEmail;
};

const findUser = async ({ email }) => {
  const userInfo:any = await Customer.findOne({ where: { email } });
  return userInfo;
};

const findUserById = async ({ id }) => {
  const userInfo:any = await Customer.findOne({ where: { id } });
  return userInfo;
};

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

const checkAdmin = async ({ username }) => {
  const findAdmin = await Admin.findOne({
    where: {
      username,
    },
    attributes: ['id', 'username', 'password'],
  });
  return findAdmin;
};

export {
  findUser, findUserById, checkEmail, signupUser, checkAdmin,
};
