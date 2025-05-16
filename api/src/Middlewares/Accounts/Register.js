module.exports = (req, res, next) => {
    if (!req.body.data) return res.status(200).json({error: 'Preencha todos os campos.'});
    const { name, type } = req.body.data;
    if (!name || !type) return res.status(200).json({status: 400, error: 'Preencha todos os campos.'});
    if (String(name).length > 255) return res.status(200).json({status: 400, error: 'Nome muito longo.'});
    if (type in ['Interna', 'Externa']) return res.status(200).json({status: 400, error: "Tipo inválido, precisa ser 'Interna' ou 'Externa'."});
    next();
}