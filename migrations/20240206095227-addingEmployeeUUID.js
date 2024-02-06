'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    
    return queryInterface.sequelize.transaction(transaction => {
      return Promise.all([
        queryInterface.addColumn('Employees', 'userid', {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        }, { transaction }),
        queryInterface.addColumn('Employees', 'employedAt', {
          type: DataTypes.DATE,
        }, { transaction })
      ]);
    });


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
