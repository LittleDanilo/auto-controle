module.exports = (req, res, next) => {
    if (!req.body) return res.status(200).json({error: 'Fill in all fields.'});
    const { name, description, type } = req.body;

    if (!name || !type) return res.status(200).json({status: 400, error: 'Fill in all fields.'});
    if (String(name).length > 255) return res.status(200).json({status: 400, error: 'Name is too long.'});
    if (type in ['Interna', 'Externa']) return res.status(200).json({status: 400, error: 'Invalid type.'});
    next();
}