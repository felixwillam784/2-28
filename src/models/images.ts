import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';

const Images = sequelize.define('images', {

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
