"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ScreenCalendars",
      [
        {
          date: "10:00~12:00",
          screenId: 1,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 2,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 3,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 4,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 5,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 6,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 7,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 8,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 10,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 11,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 13,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 15,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 17,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 18,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 20,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 21,
          movieId: 1,
        },
        {
          date: "10:00~12:00",
          screenId: 1,
          movieId: 2,
        },
        {
          date: "10:00~12:00",
          screenId: 2,
          movieId: 2,
        },
        {
          date: "10:00~12:00",
          screenId: 3,
          movieId: 2,
        },
        {
          date: "10:00~12:00",
          screenId: 4,
          movieId: 2,
        },
        {
          date: "10:00~12:00",
          screenId: 5,
          movieId: 2,
        },
        {
          date: "10:00~12:00",
          screenId: 6,
          movieId: 2,
        },
        {
          date: "10:00~12:00",
          screenId: 7,
          movieId: 2,
        },
        {
          date: "10:00~12:00",
          screenId: 1,
          movieId: 3,
        },
        {
          date: "10:00~12:00",
          screenId: 2,
          movieId: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ScreenCalendars", null, {});
  },
};
