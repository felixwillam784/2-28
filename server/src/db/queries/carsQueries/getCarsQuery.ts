import { Op } from 'sequelize';
import { Car } from '../../models';

const getCarsQuery = async ({
  brand, model, year, maxPrice, fuel, mileage, goodPrice,
}) => {
  const where:any = {
  };
  if (brand !== null && brand !== '') {
    where.brand = {
      [Op.iLike]: `%${brand.trim()}%`,
    };
  }
  if (model !== null && model !== '') {
    where.model = {
      [Op.iLike]: `%${model.trim()}%`,
    };
  }
  if (mileage !== null && mileage !== '') {
    where.mileage = {
      [Op.lte]: +mileage,
    };
  }
  if (maxPrice !== null && maxPrice !== '') {
    where.price = {
      [Op.lte]: maxPrice.trim(),
    };
  }
  if (year !== null && year !== '') {
    where.year = +year;
  }

  if (fuel !== null && fuel !== '') {
    where.fuel = fuel.trim();
  }

  if (goodPrice !== null && Boolean(+goodPrice) && goodPrice !== '') {
    where.isGoodPrice = Boolean(+goodPrice);
  }
  const cars = await Car.findAll({ where });

  return cars;
};

export default getCarsQuery;
