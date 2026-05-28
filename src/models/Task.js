import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Task = sequelize.define(
  "Task",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    description: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM("todo", "in_progress", "done"),
        defaultValue:"todo",
        allowNull: false,
        notEmpty: true
    },
    priority: {
        type: DataTypes.ENUM("low", "medium", "high"),
        defaultValue:"medium",
        allowNull: false,
        notEmpty: true
    },
    startDate: {
        type: DataTypes.DATE,
    },
    expireDate: {
        type: DataTypes.DATE,
        field: "exp_date",
    },
    createdBy:{
        type: DataTypes.INTEGER,
        allowNull:false,
        notEmpty: true
    },
    boardId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: true
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
