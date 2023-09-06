"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CinemaCalendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CinemaCalendar.belongsTo(models.Cinema);
      CinemaCalendar.belongsTo(models.ScreenCalendar);
    }
  }
  CinemaCalendar.init(
    {
      date: DataTypes.STRING,
      cinemaId: DataTypes.INTEGER,
      screenCalendarId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CinemaCalendar",
    }
  );
  return CinemaCalendar;
};
