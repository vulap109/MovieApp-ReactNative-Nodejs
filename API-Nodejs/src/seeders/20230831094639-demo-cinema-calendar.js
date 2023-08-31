"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "CinemaCalendars",
      [
        {
          date: "2023/08/31 10:00",
          cinemaId: 1,
          movieId: 1,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 2,
          movieId: 2,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 3,
          movieId: 3,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 4,
          movieId: 4,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 5,
          movieId: 5,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 6,
          movieId: 6,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 7,
          movieId: 7,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 1,
          movieId: 8,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 3,
          movieId: 9,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 4,
          movieId: 10,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 6,
          movieId: 11,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 1,
          movieId: 12,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 3,
          movieId: 13,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 4,
          movieId: 14,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 6,
          movieId: 15,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 7,
          movieId: 16,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 1,
          movieId: 17,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 2,
          movieId: 18,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 3,
          movieId: 19,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 4,
          movieId: 20,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 5,
          movieId: 21,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 6,
          movieId: 22,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 7,
          movieId: 23,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 1,
          movieId: 24,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 2,
          movieId: 25,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CinemaCalendars", null, {});
  },
};
