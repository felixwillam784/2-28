import { Car } from '../../db/models';

const addCarService = async (body, customerId) => {
  const carRequest = await Car.bulkCreate(
    [{ ...body, customerId }],
    {
      returning: true,
    },
  );
  return carRequest;
};

export default addCarService;
