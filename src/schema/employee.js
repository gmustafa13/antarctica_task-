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
        allowNull: false
    },
    empEmail: {
        type: Sequelize.STRING,
        unique: true
    }
}, {
    timestamps: true,
})

module.exports = Employee