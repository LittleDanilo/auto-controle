const validator = require('validator');

module.exports = (req, res, next) => {
    if (!req.body) return res.status(200).json({status: 400, error: 'Fill in all fields.'});
    const {email, password} = req.body;
    if (!email || !password) return res.status(200).json({status: 400, error: 'Fill in all fields.'});
    if (!validator.isEmail(email)) return res.status(200).json({status: 400, error: 'Invalid Email.'});
    next();
};