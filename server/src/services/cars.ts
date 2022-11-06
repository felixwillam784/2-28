import { Op, WhereOptions } from 'sequelize';
import {
  Car,
  Image,
  Customer,

} from '../db/models';

const addCarService = async (data) => {
  const car = await Car.create(
    data,
    {
      returning: true,
    },
  );
  return car;
};

const CAR_NUM_IN_PAGE = 9;

const getCars = async ({
  brand, model, year, maxPrice, fuel, mileage, goodPrice, state, page,
}) => {
  const where:WhereOptions = {
  };
  if (brand.trim()) {
    where.brand = {
      [Op.iLike]: `%${brand.trim()}%`,
    };
  }
  if (model.trim()) {
    where.model = {
      [Op.iLike]: `%${model.trim()}%`,
    };
  }
  if (mileage.trim()) {
    where.mileage = {
      [Op.lte]: +mileage,
    };
  }
  if (maxPrice.trim()) {
    where.price = {
      [Op.lte]: maxPrice.trim(),
    };
  }
  if (year.trim()) {
    where.year = +year;
  }
  if (fuel.trim()) {
    where.fuel = fuel.trim();
  }
  if (+goodPrice) {
    where.isGoodPrice = Boolean(+goodPrice);
  }
  if (state.trim()) {
    where.state = state.trim();
  }
  const cars = await Car.findAndCountAll(
    {
      where,
      offset: (page - 1) * CAR_NUM_IN_PAGE,
      limit: CAR_NUM_IN_PAGE,
      include: { model: Image },
      distinct: true,
    },
  );

  return cars;
};

const deleteCars = async (id) => {
  const car = await Car.destroy({
    where: ({
      id,
    }),
  });
  return car;
};

const getCarInfo = async (id) => {
  const car = await Car.findAll({
    where: { id },
    include: { model: Image },
  });
  return car;
};

const CAR_NUM = 10;
const getCarsDetailsQuery = async (state, page) => {
  const cars = await Car.findAndCountAll({
    where: {
      state,
    },
    offset: (page - 1) * CAR_NUM,
    include: [
      { model: Customer, attributes: ['fullName', 'phoneNumber', 'email'] },
    ],
    limit: CAR_NUM,
    distinct: true,
  });
  return cars;
};

const updateCarService = async (body, id) => {
  const car = await Car.update(
    { ...body },
    {
      returning: true,
      where: { id },

    },
  );
  return car;
};

const getCarByCustomerId = async (customerId) => {
  const car = await Car.findAll({
    where: { customerId },
    attributes: ['state', 'id', 'createdAt', 'model'],
  });
  return car;
};

const addImageService = async (images:Array<object>) => {
  const rows = await Image.bulkCreate([...images]);

  return rows;
};
export {
  getCars,
  getCarInfo,
  updateCarService,
  deleteCars,
  getCarsDetailsQuery,
  addCarService,
  getCarByCustomerId,
  addImageService,
};
