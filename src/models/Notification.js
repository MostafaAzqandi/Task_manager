import { DataTypes } from "sequelize";
import sequelize from "../database/database";

const Notification = sequelize.define("Notification",{
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    timestamps: true,
    underscored: true,
    modelName: "Notification",
    tableName: "notifications"
});



export default Notification;