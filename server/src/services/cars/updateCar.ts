import { Car } from '../../db/models';

const updateCarServes = async (body, id) => {
  const car = await Car.update(
    { ...body },
    { where: { id } },
  );
  console.log(car);
  return car;
};

export default updateCarServes;
