import { Car } from '../../db/models';

const updateCarServes = async (body, id) => {
  const car = await Car.update(
    { ...body },
    {
      returning: true,
      where: { id },

    },
  );
  return car;
};

export default updateCarServes;
