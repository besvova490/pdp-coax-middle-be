const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [{
    name: 'CoaxTime',
    email: 'example@example.com',
    password: bcrypt.hashSync('password', 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
