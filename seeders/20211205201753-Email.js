'use strict';

const { User } = require('../models');

const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {


    const users = await Promise.all([
      User.findAll().then(users => {
        return users
      }),
    ])

    const email = [];

    for (let i = 0; i < 1000; i++) {

      const randomUser = Math.floor(Math.random() * users[0].length);

      email.push({
        user_id: users[0][randomUser].id,
        alternate_email: faker.internet.email(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }



    return queryInterface.bulkInsert('emails', email, {});

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('emails', null, {});

  }
};
