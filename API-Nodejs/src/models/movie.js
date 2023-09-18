"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.hasMany(models.ScreenCalendar);
      Movie.hasMany(models.Reservation);
    }
  }
  Movie.init(
    {
      movieName: DataTypes.STRING,
      techSub: DataTypes.STRING,
      time: DataTypes.STRING,
      rate: DataTypes.STRING,
      poster: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
