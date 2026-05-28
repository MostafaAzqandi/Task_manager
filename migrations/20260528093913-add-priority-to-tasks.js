export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Tasks", "priority", {
      type: Sequelize.ENUM("low", "medium", "high"),
      allowNull: false,
      defaultValue: "Medium",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Tasks", "priority");
  },
};
