module.exports = (req, res, next) => {
    if (!req.body.data) req.body.data = {};
    const {type, status} = req.body.data;
    if (type && !type in ['Interna', 'Externa']) return res.status(200).json({status: 400, error: "Tipo inválido, precisa ser 'Interna' ou 'Externa'."});
    if (status && !status in ['Ativa', 'Inativa', 'Suspensa']) return res.status(200).json({status: 400, error: "Status inválido, precisa ser 'Ativa', 'Inativa' ou 'Suspensa'."});
    next();
}