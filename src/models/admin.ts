import { DataTypes } from 'sequelize';

import sequelize from '../config/connection';

const Admin = sequelize.define('admin', {
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
export default Admin;
