const jwt = require('jsonwebtoken');
const User = require('../schema/user');
const { TE, eRes } = require('../utils/util');

const auth = async (req, res, next) => {
    try {
        req.headers.authorization ? req.headers.authorization : eRes(res, "Token Required");
        let isVerify = await jwt.verify(req.headers.authorization, process.env.SECRET);
        if (isVerify) {
            if (Date.now() >= isVerify.exp * 1000) {
                return eRes(res,"token expired");
            }
            req.data = isVerify.data;
            next();
            
        } else {
            eRes(res,"Token is Not Valid")
        }
        
    } catch (error) {
        eRes(res,"Token is Not Valid")
    }
}


module.exports = {
auth
}