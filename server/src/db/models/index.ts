import Image from './image';
import Car from './car';
import Customer from './customer';
import Admin from './admin';

Car.hasMany(Image);
Image.belongsTo(Car);

Customer.hasMany(Car);
Car.belongsTo(Customer);

export {
  Image, Car, Customer, Admin,
};
