const User = require('../schema/user');
const {
    TE
} = require('../utils/util');
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { Op, Model } = require('sequelize');
const { uuid } = require('uuidv4')
const Employee = require('../schema/employee')

const createUser = async (userInfo) => {
    userInfo.userId = uuid();
    return await User.create(userInfo)
}
const logIn = async (userInfo) => {
    if (!userInfo.password) {
        TE("password required for sigin")
    };
    let userData = await User.findOne({
        where: {
            email: userInfo.email
        },
        raw: true
    })
    if (userData) {

        let isPasswordCorrect = await bycrpt.compare(userInfo.password, userData.password);
        if (isPasswordCorrect) {
            return await generateToken(userData);       
        } else {
          return TE("in correct password")
        }

    } else {
        return TE('User not Found')
    }
}
const generateToken = async (userInfo) => {
    return await jwt.sign({
        data: userInfo.email
    }, process.env.SECRET, {
        expiresIn: '1h'
    });
    
}
const getAllUser = async (userInfo) => {
    let query = {
    };
    query.where = {};

    //pagination
    let page = parseInt(userInfo.page) ? parseInt(userInfo.page) : 1
    let limit = parseInt(userInfo.limit) ? parseInt(userInfo.limit) : 10
    query.offset = (page - 1) * limit;
    query.raw = true;
    query.limit = limit
    //sort 
    if (userInfo.sortBy && userInfo.sortOrder) {
        query.order = [
            [`${userInfo.sortBy}`, `${userInfo.sortOrder}`]
        ]
       
    } else if (userInfo.sortBy) {
        query.order = [
            [`${userInfo.sortBy}`, 'DESC']
        ]
    }
    // filter
    if (userInfo.search) {
        query.where ={
            [Op.or]: [{ firstName: { [Op.like]: `%${userInfo.search}%` } }, { lastName: {[Op.like]: `%${userInfo.search}%` }}]
        }
    }
    query.include =[Employee]
    let data = await User.findAndCountAll(query);
    return await pagination(data,page,limit,data.count)
}
const pagination = async (data,page,limit,totalCount) => {
    let obj = {}
    obj.result = data.rows?data.rows:data;
    obj.limit = limit;
    obj.page = page;
    obj.totalCount = totalCount;
    return obj
}



module.exports = {
    createUser,
    logIn,
    generateToken,
    getAllUser
}