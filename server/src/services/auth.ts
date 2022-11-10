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
  return userInfo;
};

const checkAdmin = async ({ username }) => {
  const admin = await Admin.findOne({
    where: {
      username,
    },
    attributes: ['id', 'username', 'password'],
  });
  return admin;
};

const findAdminById = async (id: number) => {
  const AdminInfo = await Admin.findOne({
    where: { id },
    attributes: ['id', 'username', 'password'],
  });
  return AdminInfo;
};

export {
  findUser, findUserById, checkEmail, signupUser, checkAdmin, findAdminById,
};
