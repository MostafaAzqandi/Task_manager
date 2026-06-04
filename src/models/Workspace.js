import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Workspace = sequelize.define(
  "Workspace",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true
    },
    visibility: {
      type: DataTypes.ENUM("public", "private"),
      allowNull: false
    }
  },
  {
    timestamps: true,
    modelName: "Workspace",
    tableName: "workspaces",
    underscored: true,
  },
);

export default Workspace;
