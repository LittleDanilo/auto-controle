const validator = require('validator');

module.exports = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json({error: 'Fill in all fields.'});
    if (!validator.isEmail(email)) return res.status(400).json({error: 'Invalid Email.'});
    next();
};