module.exports = (req, res, next) => {
    if (!req.body) return req.status(400).json({status: 400, error: 'Fill all fields.'});
    var { origin, destiny, value, date, description } = req.body;
    if (!origin || !destiny || !value) return res.status(400).json({status: 400, message: 'Fill all fields.'});
    if (!description) req.body.description = '';
    if (!date) req.body.date = Date.now();
    next();
}