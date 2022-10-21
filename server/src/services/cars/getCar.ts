import { Car, Image } from '../../db/models';

const getCarInfo = async (id) => {
  const car = await Car.findAll({
    where: { id },
    include: { model: Image },
  });
  return car;
};
export default getCarInfo;
