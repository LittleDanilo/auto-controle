module.exports = (req, res, next) => {
    if (!req.body) return res.status(200).json({message: "Nada para atualizar."});
    const {fields, id} = req.body;

    if (!fields || fields == undefined) return res.status(200).json({status: 400, error: "Nada para atualizar."});
    if (!id || id == undefined) return res.status(200).json({status: 400, error: "ID inválido."});
    if (fields.name && String(fields.name).length > 255) return res.status(200).json({status: 400, error: 'Nome muito longo.'});
    if (fields.type && fields.type in ['Interna', 'Externa']) return res.status(200).json({status: 400, error: "Tipo inválido, precisa ser 'Interna' ou 'Externa'."});
    next();
}