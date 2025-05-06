const AuthService = require('../../Services/Users/AuthService');

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AuthService.userAuthentication(email, password);
        return res.status(200).json({status: 200, id: user.id });
    } catch (err) {
        return res.status(200).json({status: 400, error: err.message});
    }
};