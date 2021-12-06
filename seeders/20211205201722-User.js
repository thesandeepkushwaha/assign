'use strict';

const faker = require('faker');
const users = [...Array(100)].map(() => (
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    user_email: faker.internet.email(),
    user_password: faker.internet.password(8),
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
