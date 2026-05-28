import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const User = sequelize.define(
  "User",
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      // field: "full_name"
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      notEmpty: true,
      // field: "username"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
  },
  {
    timestamps: true,
    modelName: "User",
    tableName: "users",
    underscored: true,
  },
);

export default User;
