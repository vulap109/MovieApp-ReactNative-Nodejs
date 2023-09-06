"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailReservation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailReservation.belongsTo(models.Reservation);
      DetailReservation.belongsTo(models.Ticket);
      DetailReservation.belongsTo(models.PopcornCombo);
    }
  }
  DetailReservation.init(
    {
      reservationId: DataTypes.INTEGER,
      ticketId: DataTypes.STRING,
      popcornId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DetailReservation",
    }
  );
  return DetailReservation;
};
