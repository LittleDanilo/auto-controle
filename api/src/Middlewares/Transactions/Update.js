module.exports = (req, res, next) => {
    if (!req.body) return res.status(200).json({status: 400, error: "Nothing to update."});
    const {fields, id} = req.body;

    if (!fields || fields == undefined) return res.status(200).json({status: 400, error: "Nothing to update."});
    if (!id || id == undefined) return res.status(200).json({status: 400, error: "Invalid ID."});
    next();
}