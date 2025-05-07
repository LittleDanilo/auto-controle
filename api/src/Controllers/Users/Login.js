const AuthService = require('../../Services/Users/AuthService');

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body;
        const {id, name} = await AuthService.userAuthentication(email, password);
        return res.status(200).json({status: 200, result: {id, name, email}});
    } catch (err) {
        return res.status(200).json({status: 400, error: err.message});
    }
};