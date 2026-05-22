import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const WorkspaceMember = sequelize.define(
  "TaskAssignee",
  {
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        // field: "user_id"
    },
    workspaceId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        // field: "workspace_id"
    },
    role: {
      type: DataTypes.ENUM("owner", "admin", "member"),
      allowNull: false,
      defaultValue: "Member"
    }
  },
  {
    timestamps: true,
    modelName: "WorkspaceMember",
    tableName: "workspace_members",
    underscored: true,
  },
);

export default WorkspaceMember;
