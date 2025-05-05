module.exports = (req, res, next) => {
    if (!req.body) return res.status(400).json({error: 'Fill in all fields.'});
    const { name, description, type } = req.body;

    if (!name || !type) return res.status(400).json({error: 'Fill in all fields.'});
    if (String(name).length > 255) return res.status(400).json({error: 'Name is too long.'});
    if (type in ['Interna', 'Externa']) return res.status(400).json({error: 'Invalid type.'});
    next();
}