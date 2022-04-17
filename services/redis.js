const Redis = require('ioredis');

const redisClient = new Redis({
  password: 'password',
});

module.exports = redisClient;
