const RegisterService = require('../../Services/Users/RegisterService');

module.exports = async (req, res) => {
    try {
        const userID = req.body.userID
        const { name, email, password } = req.body.data;
        const {id} = await RegisterService.userRegister(name, email, password, userID);
        res.status(200).json({status: 200, result: {id, name, email}});
    } catch (err) {
        res.status(200).json({status: 400, error: err.message});
    }
};