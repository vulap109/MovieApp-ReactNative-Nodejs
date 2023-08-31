"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Cities",
      [
        {
          cityName: "Ha Noi",
          description: "thu do",
        },
        {
          cityName: "Tp.Ho Chi Minh",
          description: "sai gon",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cities", null, {});
  },
};
