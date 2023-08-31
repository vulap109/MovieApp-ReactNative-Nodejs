"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PopcornCombo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PopcornCombo.hasOne(models.DetailReservation);
    }
  }
  PopcornCombo.init(
    {
      comboName: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PopcornCombo",
    }
  );
  return PopcornCombo;
};
