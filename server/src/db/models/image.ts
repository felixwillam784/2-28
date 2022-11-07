import { DataTypes } from 'sequelize';
import { ImageInstance } from '../../interfaces';
import sequelize from '../config/connection';

const Image = sequelize.define<ImageInstance>('image', {

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Image;
