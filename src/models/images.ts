import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Images = sequelize.define('images', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Images;
