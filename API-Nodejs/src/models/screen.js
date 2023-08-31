"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Screen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Screen.belongsTo(models.Cinema);
      Screen.hasMany(models.ScreenCalendar);
    }
  }
  Screen.init(
    {
      screenName: DataTypes.STRING,
      seat: DataTypes.STRING,
      rowSeat: DataTypes.STRING,
      colSeat: DataTypes.STRING,
      cinemaId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Screen",
    }
  );
  return Screen;
};
