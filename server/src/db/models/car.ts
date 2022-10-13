import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Car = sequelize.define('car', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mileage: {
    type: DataTypes.INTEGER,
  },
  quality: {
    type: DataTypes.INTEGER,
  },
  isGoodPrice: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    allowNull: false,
    type: DataTypes.ENUM('pending', 'under-check', 'on-market', 'sold'),
    defaultValue: 'pending',
  },
  transmission: {
    type: DataTypes.ENUM('auto', 'manual'),
  },
  features: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  description: {
    type: DataTypes.STRING,
  },
  fuel: {
    type: DataTypes.ENUM('diesel', 'petrol'),
  },
});
export default Car;
