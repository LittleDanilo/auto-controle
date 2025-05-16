const validator = require('validator');

module.exports = (req, res, next) => {
    if (!req.body.data) return res.status(200).json({status: 400, error: 'Fill in all fields.'});
    const { name, email, password } = req.body.data;

    if (!name || !email || !password) return res.status(200).json({status: 400, error: 'Preencha todos os campos.'});
    if (!validator.isEmail(email)) return res.status(200).json({status: 400, error: 'Email inválido'});
    if (String(password).length < 6) return res.status(200).json({status: 400, error: 'Senha muito curta, precisa ter no mínimo 6 caracteres.'});
    next();
}