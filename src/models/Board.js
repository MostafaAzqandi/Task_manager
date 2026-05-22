import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Board = sequelize.define(
  "Board",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    workspaceId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        // field: "workspace_id"
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
