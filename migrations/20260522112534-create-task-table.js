"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("tasks", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM("todo","in_progress", "done"),
      DefaultValue: "todo",
      allowNull: false
    },
    start_date: {
      type: Sequelize.DATE
    },
    exp_date: {
      type: Sequelize.DATE
    },
    board_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "boards",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE" 
    },
    created_by: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("tasks");
}
