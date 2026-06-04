export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("workspaces", "visibility", {
      type: Sequelize.ENUM("public", "private"),
      allowNull: false,
      defaultValue: "private",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("workspaces", "visibility");
  },
};
