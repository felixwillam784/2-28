import { Car } from '../../db/models';

const getCarById = async (id) => {
  const carId = await Car.findByPk(id);
  return carId;
};
export default getCarById;
