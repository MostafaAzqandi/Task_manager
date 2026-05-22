"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("task_assignees", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    task_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: "tasks",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
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
  await queryInterface.addConstraint("task_assignees", {
    fields: ["task_id", "user_id"],
    type: "unique",
    name: "unique_task_assignee"
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("task_assignees");
}
