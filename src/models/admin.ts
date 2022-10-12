import { DataTypes } from 'sequelize';

import sequelize from '../config/connection';

const Admin = sequelize.define('admin', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  usernmae: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
})
export default Admin