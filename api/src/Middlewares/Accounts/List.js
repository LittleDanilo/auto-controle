module.exports = (req, res, next) => {
    const filters = req.query;
    if (filters.id_conta) filters.id_conta = Number(filters.id_conta);
    req.filters = filters;
    next();
}