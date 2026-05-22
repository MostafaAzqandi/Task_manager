import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Workspace = sequelize.define(
  "Workspace",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // field: "created_by"
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
