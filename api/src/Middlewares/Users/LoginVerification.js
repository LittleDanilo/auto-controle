module.exports = (req, res, next) => {
    const paths = ['/users/login'];
    if (paths.includes(req.path)) return next();
    if (!req.body) return res.status(200).json({status: 401, error: 'Usuário não autenticado'});
    if (!req.body.userID) return res.status(200).json({status: 401, error: 'Usuário não autenticado'});
    next();
}