const validator = require('validator');

module.exports = (req, res, next) => {
    if (!req.body) return res.status(200).json({status: 400, error: 'Fill in all fields.'});
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(200).json({status: 400, error: 'Fill in all fields.'});
    if (!validator.isEmail(email)) return res.status(200).json({status: 400, error: 'Invalid email.'});
    if (String(password).length < 6) return res.status(200).json({status: 400, error: 'Password too short.'});
    next();
}