import {
  Image, Car, Customer, Admin,
} from '../models';

const sequelize = require('sequelize');
const {
  cars, customers, admins, images,
} = require('./fakedata.json');

(async () => {
  await sequelize.sync({ force: true });

  const adminsPromises = Admin.bulkCreate(admins);

  const customersPromises = Customer.bulkCreate(customers);

  const carsPromises = Car.bulkCreate(cars);

  const imagesPromises = Image.bulkCreate(images);

  await Promise.all([...adminsPromises, ...customersPromises, ...carsPromises, ...imagesPromises]);
})();
