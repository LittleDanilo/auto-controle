module.exports = (req, res, next) => {
    if (!req.body.data) return res.status(200).json({status: 400, error: "Nada para atualizar."});
    const {fields, id} = req.body.data;
    if (!fields || Object.keys(fields).length == 0) return res.status(200).json({status: 400, error: "Nada para atualizar."});
    if (!id || id <= 0) return res.status(200).json({status: 400, error: "ID invalido."});
    next();
}