import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const TaskAssignee = sequelize.define(
  "TaskAssignee",
  {
    taskId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        notEmpty: true
        // field: "task_id"
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        notEmpty: true
        // field: "user_id"
    }
  },
  {
    timestamps: true,
    modelName: "TaskAssignee",
    tableName: "task_assignees",
    underscored: true,
  },
);

export default TaskAssignee;
