require('dotenv').config();

module.exports = {
  development: {
    username: process.env.EXPRESS_APP_DB_USER_NAME,
    password: process.env.EXPRESS_APP_DB_USER_PASSWORD,
    database: process.env.EXPRESS_APP_DB_NAME,
    host: process.env.EXPRESS_APP_DB_HOST,
    port: process.env.EXPRESS_APP_DB_PORT,
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.EXPRESS_APP_DB_USER_NAME,
    password: process.env.EXPRESS_APP_DB_USER_PASSWORD,
    database: process.env.EXPRESS_APP_DB_NAME,
    host: process.env.EXPRESS_APP_DB_HOST,
    port: process.env.EXPRESS_APP_DB_PORT,
    dialect: 'postgres',
  },
};
