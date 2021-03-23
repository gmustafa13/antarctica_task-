const Sequelize = require("sequelize");
const User = require('./user');

const Employee = sequelize.define('Employee', {
    id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
    },
    organizationName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    employeeId: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull:false
    },
    userId: {
        type: Sequelize.STRING,
        unique: true
    }
}, {
    timestamps: true,
})

Employee.associate = function () {
    User.belongsTo(Employee, { cascade: true, foreignKey: 'employee_id' ,as:'users'});
    // return Employee
};
module.exports = Employee