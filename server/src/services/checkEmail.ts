import { Customer } from '../db/models';

const checkEmail = async ({ email }) => {
  const gtiEmail = await Customer.findAll({
    where: {
      email,
    },
    attributes: ['email'],
  });
  return gtiEmail;
};
export default checkEmail;
