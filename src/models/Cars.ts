import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Cars = sequelize.define('cars', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  brand: {
    type: DataTypes.STRING
  },
  model: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.DOUBLE
  },
  year: {
    type: DataTypes.INTEGER
  },
  mileage: {
    type: DataTypes.INTEGER
  },
  quality: {
    type: DataTypes.INTEGER
  },
  isGoodPrice: {
    type: DataTypes.BOOLEAN
  },
  location: {
    type: DataTypes.STRING
  },
  state: {
    type: DataTypes.STRING
  },
  transmission: {
    type: DataTypes.STRING
  },
  features: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  fuel: {
    type: DataTypes.STRING
  }
});
export default Cars;
