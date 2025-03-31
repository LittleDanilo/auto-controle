const AuthService = require('../Services/AuthService');

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AuthService.userAuthentication(email, password);
        res.status(200).json({ user: user.id });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};