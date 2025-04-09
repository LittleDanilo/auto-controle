module.exports = (req, res, next) => {
    if (!req.body) return res.status(200).json({message: "Nothing to update."});
    const {fields, id} = req.body;

    if (!fields || fields == undefined) return res.status(200).json({message: "Nothing to update."});
    if (!id || id == undefined) return res.status(200).json({message: "Invalid ID."});
    if (fields.name && String(body.name).length > 255) return res.status(400).json({error: 'Name is too long.'});
    if (fields.type && body.type in ['Interna', 'Externa']) return res.status(400).json({error: 'Invalid type.'});
    next();
}