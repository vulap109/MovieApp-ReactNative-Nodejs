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
          screenCalendarId: 1,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 2,
          screenCalendarId: 2,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 3,
          screenCalendarId: 3,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 4,
          screenCalendarId: 4,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 5,
          screenCalendarId: 5,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 6,
          screenCalendarId: 6,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 7,
          screenCalendarId: 7,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 1,
          screenCalendarId: 8,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 3,
          screenCalendarId: 9,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 4,
          screenCalendarId: 10,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 6,
          screenCalendarId: 11,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 1,
          screenCalendarId: 12,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 3,
          screenCalendarId: 13,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 4,
          screenCalendarId: 14,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 6,
          screenCalendarId: 15,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 7,
          screenCalendarId: 16,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 1,
          screenCalendarId: 17,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 2,
          screenCalendarId: 18,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 3,
          screenCalendarId: 19,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 4,
          screenCalendarId: 20,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 5,
          screenCalendarId: 21,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 6,
          screenCalendarId: 22,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 7,
          screenCalendarId: 23,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 1,
          screenCalendarId: 24,
        },
        {
          date: "2023/08/31 10:00",
          cinemaId: 2,
          screenCalendarId: 25,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CinemaCalendars", null, {});
  },
};
