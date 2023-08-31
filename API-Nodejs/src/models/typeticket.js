"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TypeTicket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TypeTicket.hasMany(models.Ticket);
    }
  }
  TypeTicket.init(
    {
      typeName: DataTypes.STRING,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TypeTicket",
    }
  );
  return TypeTicket;
};
