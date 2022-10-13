import { DataTypes } from 'sequelize';
import sequelize from '../db/config/connection';

const Image = sequelize.define('image', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Image;
