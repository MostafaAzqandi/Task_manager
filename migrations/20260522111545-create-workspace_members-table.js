"use strict";

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("workspace_members", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
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
    workspace_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: "workspaces",
        key: "id"
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE" 
    },
    role: {
      type: Sequelize.ENUM("owner", "admin", "member"),
      allowNull: false,
      defaultValue: "Member"
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
  await queryInterface.addConstraint("workspace_members", {
    fields: ["user_id", "workspace_id"],
    type: "unique",
    name: "unique_workspace_member"
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("workspace_members");
}
