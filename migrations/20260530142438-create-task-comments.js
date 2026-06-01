export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("task_comments", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },

    task_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "tasks",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("task_comments");
}