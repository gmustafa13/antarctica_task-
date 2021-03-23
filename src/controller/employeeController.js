const empService = require('../services/employee')
const {
    sRes,
    TE,
    eRes
} = require('../utils/util')
const createEmp = async (req, res) => {
    try {
        let userInfo = req.body;
        userInfo.empEmail = req.data;
        let result = await empService.createEmp(userInfo);
        if (result) {
            sRes(res, result)
        } else {
            eRes(res, "employee not created");
        }

    } catch (error) {
        eRes(res, error);
    }
}

module.exports = {
    createEmp
}