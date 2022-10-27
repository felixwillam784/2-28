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
export default checkEmail;
