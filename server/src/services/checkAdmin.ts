import { Admin } from '../db/models';

const checkAdmin = async ({ username }) => {
  const getAdmin:any = await Admin.findOne({
    where: {
      username,
    },
    attributes: ['username', 'password'],
  });
  return getAdmin;
};
export default checkAdmin;
