export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("activity_log", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    action: {
      type: Sequelize.STRING,
      allowNull: false,
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
  await queryInterface.dropTable("activity_log");
}
