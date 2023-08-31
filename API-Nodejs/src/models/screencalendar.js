"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ScreenCalendar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ScreenCalendar.belongsTo(models.Screen);
      ScreenCalendar.belongsTo(models.Movie);
      ScreenCalendar.hasOne(models.CinemaCalendar);
    }
  }
  ScreenCalendar.init(
    {
      date: DataTypes.STRING,
      screenId: DataTypes.INTEGER,
      movieId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ScreenCalendar",
    }
  );
  return ScreenCalendar;
};
