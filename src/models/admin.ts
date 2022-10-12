import { DataTypes } from 'sequelize';

import sequelize from '../config/connection';

const Admin = sequelize.define('admin', {
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