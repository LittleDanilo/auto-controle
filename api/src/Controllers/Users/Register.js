const RegisterService = require('../../Services/Users/RegisterService');

module.exports = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await RegisterService.userRegister(name, email, password);
        res.status(200).json({status: 200, result: user.id});
    } catch (error) {
        res.status(200).json({status: 400, error: error});
    }
};