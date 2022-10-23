import { Op } from 'sequelize';
import { Car, Image } from '../../db/models';

const CAR_NUM_IN_PAGE = 9;

const getCars = async ({
  brand, model, year, maxPrice, fuel, mileage, goodPrice, state, page,
}) => {
  const where:any = {
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

export default getCars;
