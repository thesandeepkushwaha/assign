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

    const product = [];

    for (let i = 0; i < 1000; i++) {

      const randomUser = Math.floor(Math.random() * users[0].length);

      product.push({
        user_id: users[0][randomUser].id,
        product_name: faker.name.firstName(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }



    return queryInterface.bulkInsert('products', product, {});
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
     */
    return queryInterface.bulkDelete('products', null, {});

  }
};
