require('dotenv').config();
const Redis = require('ioredis');

const redisClient = new Redis({
  password: process.env.EXPRESS_APP_REDIS_PASSWORD,
  host: process.env.EXPRESS_APP_REDIS_HOST,
});

module.exports = redisClient;
