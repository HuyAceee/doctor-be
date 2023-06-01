"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Markdown.belongsTo(models.User, {
        foreignKey: "doctorid",
        as: "markdownData",
      });
    }
  }
  Markdown.init(
    {
      doctorId: DataTypes.STRING,
      clinicId: DataTypes.STRING,
      specialtyId: DataTypes.STRING,
      contentHTML: DataTypes.TEXT,
      contentMarkdown: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Markdown",
    }
  );
  return Markdown;
};
