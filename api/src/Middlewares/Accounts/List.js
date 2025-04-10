module.exports = (req, res, next) => {
    req.where = {};
    if (req.body) req.where = req.body;
    next();
}