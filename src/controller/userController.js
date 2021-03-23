const userService = require('../services/user')
const {sRes ,TE,eRes} = require('../utils/util')
const createUser = async (req, res) => {
    try {
        let userInfo = req.body;
        let result = await userService.createUser(userInfo);
        if (result) {
            sRes(res,result)
        } else {
            eRes(res, "User Not Created");
        }

    } catch (error) {
        eRes(res, error);
    }
    
}
const logIn = async (req,res) => {
    try {
        let userInfo = req.body ? req.body : TE('Data not available');
        if (userInfo) {
            let result = await userService.logIn(userInfo);
            if (result) {  
                return sRes(res,result,200)
            } else {
                return eRes(res,'User Not Found',400)
            }
        }
    } catch (error) {
        eRes(res, error);
    }
}
const getAllUser = async (req, res) => {
    try {
        let userInfo = req.query
        userInfo.email = req.data
        let result = await userService.getAllUser(userInfo);
        if (result) {
            return sRes(res, result);
        } else {
            eRes(res,"User list Not Found")
        }
        
    } catch (error) {
        eRes(res,error)
    }
}


module.exports = {
    createUser,
    logIn,
    getAllUser
}