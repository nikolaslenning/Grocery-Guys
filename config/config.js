// https://stackoverflow.com/questions/38757728/using-an-enviroment-variable-for-local-sequelize-configuration
require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.USERNAME,
    "password": process.env.PWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT
  },
  "test": {
    "username": process.env.USERNAME,
    "password": process.env.PWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT
  },
  "production": {
    "username": process.env.USERNAME,
    "password": process.env.PWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT
  }
};
