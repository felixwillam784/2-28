import { Car, Customer } from '../../db/models';

const CAR_NUM_IN_PAGE = 10;
const getCarsDetailsQuery = async (state, page) => {
  const cars = await Car.findAndCountAll({
    where: {
      state,
    },
    offset: (page - 1) * CAR_NUM_IN_PAGE,
    include: [
      { model: Customer, attributes: ['fullName', 'phoneNumber', 'email'] },
    ],
    limit: CAR_NUM_IN_PAGE,
    distinct: true,
  });
  return cars;
};

export default getCarsDetailsQuery;
