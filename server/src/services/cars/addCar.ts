import { Car } from '../../db/models';

const addCarService = async (body, id) => {
  const carRequest = await Car.create(
    { ...body, customerId: id },
    {
      returning: true,
    },
  );
  return carRequest;
};

export default addCarService;
