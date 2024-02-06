'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SalaryPayments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      paymentDate: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      employeeId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Employees',
          key: 'id',
        }

      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SalaryPayments');
  }
};