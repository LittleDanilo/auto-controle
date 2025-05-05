const validator = require('validator');

module.exports = (req, res, next) => {
    if (!req.body) return res.status(400).json({error: 'Fill in all fields.'});
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({error: 'Fill in all fields.'});
    if (!validator.isEmail(email)) return res.status(400).json({error: 'Invalid email.'});
    if (String(password).length < 6) return res.status(400).json({error: 'Password too short.'});
    next();
}