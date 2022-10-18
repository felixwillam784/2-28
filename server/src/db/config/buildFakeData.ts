import {
  Image, Car, Customer, Admin,
} from '../models';
import {
  admins, customers, cars, images,
} from './fakedata.json';
import sequelize from './connection';

const buildDB = async () => {
  await sequelize.sync({ force: true });

  await Admin.bulkCreate(admins);

  await Customer.bulkCreate(customers);

  await Car.bulkCreate(cars);

  await Image.bulkCreate(images);
};
if (process.env.DB_SEED) {
  buildDB();
}
export default buildDB;
