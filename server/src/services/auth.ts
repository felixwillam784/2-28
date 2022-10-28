import { Customer } from '../db/models';

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
  const userInfo = await Customer.findOne({ where: { email } });
  return userInfo;
};

const findUserById = async ({ id }) => {
  const userInfo = await Customer.findOne({ where: { id } });
  return userInfo;
};

const signupUser = async ({
  email, password, fullName, phoneNumber,
}) => {
  const userInfo = await Customer.create({
    email,
    password,
    fullName,
    phoneNumber,
  });
  return userInfo.id;
};

export {
  findUser, findUserById, checkEmail, signupUser,
};
