const express = require('express');
const route = express.Router();
const userController = require('../controller/userController')
const middleware = require('../middleware/auth')

route.post('/signUp', userController.createUser);
route.post('/login', userController.logIn);
route.get('/userList',middleware.auth,userController.getAllUser)
module.exports = route