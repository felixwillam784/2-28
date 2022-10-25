import { Car } from '../../db/models';

const deleteCars = async (id) => {
  const car = await Car.destroy({
    where: ({
      id,
    }),
  });
  return car;
};
export default deleteCars;
