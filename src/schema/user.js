const Sequelize = require("sequelize");
const bcrypt = require('bcrypt')
const {
    TE
} = require('../utils/util')
const Employee = require('./employee')

const User = sequelize.define(
    "User", {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        employee_id: {
            type: Sequelize.STRING
        },
        id: {
            allowNull: false,
            autoIncrement: true,
            unique: true,
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.STRING,
            primaryKey: true

        }
    }, {
        timestamps: true,
    }
);

User.beforeSave(async (user) => {
    try {
        if (user.password) {
            let salt, hash
            salt = await bcrypt.genSalt(10)
            if (salt) {
                hash = await bcrypt.hash(user.password, salt);
                user.password = hash;
            } else {
                TE('salt not generated')
            }
        }
    } catch (error) {
        TE(error.message)
    }
})
User.associate = function () {
    Employee.hasMany(User, { foreignKey: 'employee_id' ,as:'employees'});
    return User
};

module.exports = User;
