import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const WorkspaceMember = sequelize.define(
  "WorkspaceMember",
  {
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
    },
    workspaceId: {
        type: DataTypes.INTEGER,
        allowNull:false,
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
