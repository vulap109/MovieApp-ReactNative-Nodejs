"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Screens",
      [
        {
          screenName: "Screen 01",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 1,
        },
        {
          screenName: "Screen 01",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 2,
        },
        {
          screenName: "Screen 01",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 3,
        },
        {
          screenName: "Screen 01",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 4,
        },
        {
          screenName: "Screen 01",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 5,
        },
        {
          screenName: "Screen 01",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 6,
        },
        {
          screenName: "Screen 01",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 7,
        },
        {
          screenName: "Screen 02",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 1,
        },
        {
          screenName: "Screen 02",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 2,
        },
        {
          screenName: "Screen 02",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 3,
        },
        {
          screenName: "Screen 02",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 4,
        },
        {
          screenName: "Screen 02",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 5,
        },
        {
          screenName: "Screen 02",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 6,
        },
        {
          screenName: "Screen 02",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 7,
        },
        {
          screenName: "Screen 03",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 1,
        },
        {
          screenName: "Screen 03",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 2,
        },
        {
          screenName: "Screen 03",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 3,
        },
        {
          screenName: "Screen 03",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 4,
        },
        {
          screenName: "Screen 03",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 5,
        },
        {
          screenName: "Screen 03",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 6,
        },
        {
          screenName: "Screen 03",
          seat: "110",
          rowSeat: "10",
          colSeat: "A-K",
          cinemaId: 7,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Screens", null, {});
  },
};
