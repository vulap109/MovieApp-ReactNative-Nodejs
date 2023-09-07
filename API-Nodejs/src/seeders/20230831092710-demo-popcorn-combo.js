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
      "PopcornCombos",
      [
        {
          comboName: "Popcorn & drink 1",
          price: 120000,
          description:
            "J. Robert Oppenheimer was the director of the Los Alamos Laboratory during World War II, and is often credited as the father of the atomic bomb.",
        },
        {
          comboName: "Popcorn & drink 2",
          price: 120000,
          description:
            "J. Robert Oppenheimer was the director of the Los Alamos Laboratory during World War II, and is often credited as the father of the atomic bomb.",
        },
        {
          comboName: "Popcorn & drink 3",
          price: 120000,
          description:
            "J. Robert Oppenheimer was the director of the Los Alamos Laboratory during World War II, and is often credited as the father of the atomic bomb.",
        },
        {
          comboName: "Popcorn & drink 4",
          price: 120000,
          description:
            "J. Robert Oppenheimer was the director of the Los Alamos Laboratory during World War II, and is often credited as the father of the atomic bomb.",
        },
        {
          comboName: "Popcorn & drink 5",
          price: 120000,
          description:
            "J. Robert Oppenheimer was the director of the Los Alamos Laboratory during World War II, and is often credited as the father of the atomic bomb.",
        },
        {
          comboName: "Popcorn & drink 6",
          price: 120000,
          description:
            "J. Robert Oppenheimer was the director of the Los Alamos Laboratory during World War II, and is often credited as the father of the atomic bomb.",
        },
        {
          comboName: "Popcorn & drink 7",
          price: 120000,
          description:
            "J. Robert Oppenheimer was the director of the Los Alamos Laboratory during World War II, and is often credited as the father of the atomic bomb.",
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
    await queryInterface.bulkDelete("PopcornCombos", null, {});
  },
};
