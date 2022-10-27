import { Car } from '../../db/models';

const addCarService = async (data) => {
  const car = await Car.create(
    data,
    {
      returning: true,
    },
  );
  return car;
};

export default addCarService;
