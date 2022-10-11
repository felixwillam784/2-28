import { Sequelize } from 'sequelize';
require('dotenv').config();

let dbUrl;

if (process.env.NODE_ENV === 'test') {
  dbUrl = process.env.DB_URL;
} else {
  dbUrl = process.env.DB_URL;
}

const sequelize = new Sequelize(dbUrl, { logging: false });

export default sequelize;
