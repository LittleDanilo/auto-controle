const RegisterService = require('../../Services/User/RegisterService');

module.exports = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await RegisterService.userRegister(name, email, password);
        res.status(200).json({ user: user.id });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};