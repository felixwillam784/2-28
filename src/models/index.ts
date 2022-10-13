import Image from './image';
import Car from './car';
import customers from './customer';
import Admin from './admin';

Car.hasMany(Image);
Image.belongsTo(Car);

customers.hasMany(Car);
Car.belongsTo(customers);

export default {
  Image, Car, customers, Admin,
};
