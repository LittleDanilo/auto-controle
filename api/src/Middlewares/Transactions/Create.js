module.exports = (req, res, next) => {
    if (!req.body.data) return req.status(200).json({status: 400, error: 'Preencha todos os campos.'});
    var { origin, destiny, value, date, description } = req.body.data;
    if (!origin || !destiny || !value) return res.status(200).json({status: 400, error: 'Preencha todos os campos.'});
    if (!description) req.body.data.description = '';
    if (!date) req.body.data.date = Date.now();
    if (date) req.body.data.date = new Date(date);
    next();
}