const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`postgres://${process.env.EXPRESS_APP_DB_USER_NAME}:${process.env.EXPRESS_APP_DB_USER_PASSWORD}@${process.env.EXPRESS_APP_DB_HOST}:${process.env.EXPRESS_APP_DB_PORT}/${process.env.EXPRESS_APP_DB_NAME}`);

async function connectionCheck() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  dbConnection: sequelize,
  connectionCheck,
};
