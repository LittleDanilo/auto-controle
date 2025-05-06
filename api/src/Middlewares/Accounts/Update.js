module.exports = (req, res, next) => {
    if (!req.body) return res.status(200).json({message: "Nothing to update."});
    const {fields, id} = req.body;

    if (!fields || fields == undefined) return res.status(200).json({status: 400, error: "Nothing to update."});
    if (!id || id == undefined) return res.status(200).json({status: 400, error: "Invalid ID."});
    if (fields.name && String(fields.name).length > 255) return res.status(200).json({status: 400, error: 'Name is too long.'});
    if (fields.type && fields.type in ['Interna', 'Externa']) return res.status(200).json({status: 400, error: 'Invalid type.'});
    next();
}