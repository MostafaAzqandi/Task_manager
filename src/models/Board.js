import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Board = sequelize.define(
  "Board",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    workspaceId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        notEmpty: true
        // field: "workspace_id"
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true
      // field: "created_by"
    }
  },
  {
    timestamps: true,
    modelName: "board",
    tableName: "boards",
    underscored: true,
  },
);

export default Board;
