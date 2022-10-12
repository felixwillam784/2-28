import { Sequelize } from 'sequelize';
require('dotenv').config();
const { DB_URL, NODE_ENV, DB_URL_DEV, DB_URL_TEST } = process.env;

let dbUrl;

switch (NODE_ENV) {
  case 'production': dbUrl = DB_URL;
    break;
  case 'development': dbUrl = DB_URL_DEV;
    break;
  case 'test': dbUrl = DB_URL_TEST;
    break;
  default: throw Error('there is error in database url');
}

const sequelize = new Sequelize(dbUrl, {
  logging: false,
  dialectOptions: {
    ssl: NODE_ENV === 'production'
      ? {
          require: true,
          rejectUnauthorized: false
        }
      : false
  }
});

export default sequelize;
