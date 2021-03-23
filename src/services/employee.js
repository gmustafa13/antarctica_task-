const Employee = require('../schema/employee');
const User = require('../schema/user')
const {
    TE
} = require('../utils/util');
const {uuid}= require('uuidv4')
const { Op } = require('sequelize');


const createEmp = async (userInfo) => {
    userInfo.employeeId = uuid();
    let empData = await Employee.create(userInfo, {raw:true});
    if (empData) {
        await User.update({ employee_id: empData.employeeId }, {
            where: {
            email:userInfo.empEmail
            }
        })
        return empData
    } else {
        return TE("error while creating emp")
    }
}

module.exports = {
    createEmp
}