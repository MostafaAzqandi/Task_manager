import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const TaskComment= sequelize.define(
  "TaskComment",
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    }
  },
  {
    timestamps: true,
    modelName: "TaskComment",
    tableName: "task_comments",
    underscored: true,
  },
);

export default TaskComment;
