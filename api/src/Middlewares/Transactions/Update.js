module.exports = (req, res, next) => {
    if (!req.body) return res.status(200).json({status: 400, error: "Nada para atualizar."});
    const {fields, id} = req.body;

    if (!fields || fields == undefined) return res.status(200).json({status: 400, error: "Nada para atualizar."});
    if (!id || id == undefined) return res.status(200).json({status: 400, error: "ID inválido."});
    next();
}