"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Cinemas",
      [
        {
          cinemaName: "Cinema Ha Noi 1",
          address: "thu do HN",
          description: "",
          cityId: 1,
        },
        {
          cinemaName: "Cinema Ha Noi 2",
          address: "thu do HN",
          description: "",
          cityId: 1,
        },
        {
          cinemaName: "Cinema Ha Noi 3",
          address: "thu do HN",
          description: "",
          cityId: 1,
        },
        {
          cinemaName: "Cinema Ha Noi 4",
          address: "thu do HN",
          description: "",
          cityId: 1,
        },
        {
          cinemaName: "Cinema Ha Noi 5",
          address: "thu do HN",
          description: "",
          cityId: 1,
        },
        {
          cinemaName: "Cinema Ha Noi 6",
          address: "thu do HN",
          description: "",
          cityId: 1,
        },
        {
          cinemaName: "Cinema Ha Noi 7",
          address: "thu do HN",
          description: "",
          cityId: 1,
        },
        {
          cinemaName: "Cinema HCM 1",
          address: "thu do HN",
          description: "",
          cityId: 2,
        },
        {
          cinemaName: "Cinema HCM 2",
          address: "thu do HN",
          description: "",
          cityId: 2,
        },
        {
          cinemaName: "Cinema HCM 3",
          address: "thu do HN",
          description: "",
          cityId: 2,
        },
        {
          cinemaName: "Cinema HCM 4",
          address: "thu do HN",
          description: "",
          cityId: 2,
        },
        {
          cinemaName: "Cinema HCM 5",
          address: "thu do HN",
          description: "",
          cityId: 2,
        },
        {
          cinemaName: "Cinema HCM 6",
          address: "thu do HN",
          description: "",
          cityId: 2,
        },
        {
          cinemaName: "Cinema HCM 7",
          address: "thu do HN",
          description: "",
          cityId: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cinemas", null, {});
  },
};
