"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Movies",
      [
        {
          movieName: "OPPENHEIMER",
          techSub: "2D | vietnam sub",
          time: "120",
          rate: "18",
        },
        {
          movieName: "BLUE BEETLE",
          techSub: "2D | vietnam sub",
          time: "120",
          rate: "18",
        },
        {
          movieName: "GRAN TURISMO: TAY ĐUA CỰ PHÁCH",
          techSub: "2D | vietnam sub",
          time: "120",
          rate: "18",
        },
        {
          movieName: "HÀM TỬ THẦN",
          techSub: "2D | vietnam sub",
          time: "120",
          rate: "18",
        },
        {
          movieName: "GỌI HỒN QUỶ DỮ",
          techSub: "2D | vietnam sub",
          time: "120",
          rate: "18",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Movies", null, {});
  },
};
