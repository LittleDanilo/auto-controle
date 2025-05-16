const validator = require('validator');

module.exports = (req, res, next) => {
    if (!req.body.data) req.body.data = {};
    const {email} = req.body.data;
    if (email && !validator.isEmail(email)) return res.status(200).json({status: 200, error: "Email inválido"});
    next(); 
}