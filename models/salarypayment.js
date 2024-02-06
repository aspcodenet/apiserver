'use strict';
const {
  Model
} = require('sequelize');
const employee = require('./employee');
module.exports = (sequelize, DataTypes) => {
  class SalaryPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Employee}) {
      this.belongsTo(Employee, { foreignKey: 'employeeId', as: 'employee' })
      // define association here
    }
  }
  SalaryPayment.init({
    paymentDate: DataTypes.DATE,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SalaryPayment',
  });
  return SalaryPayment;
};