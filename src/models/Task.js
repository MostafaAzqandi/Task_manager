import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Task = sequelize.define(
  "Task",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM("todo", "in_progress", "done"),
        defaultValue:"todo",
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        // field: "start_date"
    },
    expireDate: {
        type: DataTypes.DATE,
        field: "exp_date"
    },
    createdBy:{
        type: DataTypes.INTEGER,
        allowNull:false,
        // field: "created_by"
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // field: "board_id"
    }
  },
  {
    timestamps: true,
    modelName: "task",
    tableName: "tasks",
    underscored: true,
  },
);

export default Task;
