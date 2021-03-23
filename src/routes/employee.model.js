const express = require('express');
const route = express.Router();
const employeeController = require('../controller/employeeController')
const middleware = require('../middleware/auth')

route.post('/createEmployee',middleware.auth, employeeController.createEmp);

module.exports = route