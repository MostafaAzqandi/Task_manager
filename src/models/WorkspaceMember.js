import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const WorkspaceMember = sequelize.define(
  "WorkspaceMember",
  {
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        notEmpty: true
    },
    workspaceId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        notEmpty: true
    },
    role: {
      type: DataTypes.ENUM("owner", "admin", "member"),
      allowNull: false,
      defaultValue: "member"
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
