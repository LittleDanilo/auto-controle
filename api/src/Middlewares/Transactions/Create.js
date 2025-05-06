module.exports = (req, res, next) => {
    if (!req.body) return req.status(200).json({status: 400, error: 'Preencha todos os campos.'});
    var { origin, destiny, value, date, description } = req.body;
    if (!origin || !destiny || !value) return res.status(200).json({status: 400, error: 'Preencha todos os campos.'});
    if (!description) req.body.description = '';
    if (!date) req.body.date = Date.now();
    next();
}