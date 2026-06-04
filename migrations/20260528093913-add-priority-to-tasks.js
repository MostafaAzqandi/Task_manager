export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("tasks", "priority", {
      type: Sequelize.ENUM("low", "medium", "high"),
      allowNull: false,
      defaultValue: "medium",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("tasks", "priority");
  },
};
