import { DataTypes } from 'sequelize';

import sequelize from '../config/connection';

const Admins = sequelize.define('admins', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
export default Admins;
