import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const User = sequelize.define(
  "User",
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      // field: "full_name"
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      // field: "username"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true,
    modelName: "User",
    tableName: "users",
    underscored: true
  }
);

export default User;
