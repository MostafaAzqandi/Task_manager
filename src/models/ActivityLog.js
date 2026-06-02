import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const ActivityLog = sequelize.define("ActivityLog",{
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    tableName: "activity_log",
    modelName: "ActivityLog",
    underscored: true
}
);


export default ActivityLog;