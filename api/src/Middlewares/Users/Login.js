const validator = require('validator');

module.exports = (req, res, next) => {
    if (!req.body) return res.status(400).json({error: 'Fill in all fields.'});
    const {email, password} = req.body;
    if (!email || !password) return res.status(400).json({error: 'Fill in all fields.'});
    if (!validator.isEmail(email)) return res.status(400).json({error: 'Invalid Email.'});
    next();
};