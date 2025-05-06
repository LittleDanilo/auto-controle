module.exports = (req, res, next) => {
    if (!req.body) req.body = {};
    const {id, name, type, status} = req.body;
    if (id && typeof(id) != Number) return res.status(200).json({status: 400, error: "ID inválido."});
    if (name && String(name).length <= 0) name = "";
    if (type && !type in ['Interna', 'Externa']) return res.status(200).json({status: 400, error: "Tipo inválido, precisa ser 'Interna' ou 'Externa'."});
    if (status && !status in ['Ativa', 'Inativa', 'Suspensa']) return res.status(200).json({status: 400, error: "Status inválido, precisa ser 'Ativa', 'Inativa' ou 'Suspensa'."});
    next();
}