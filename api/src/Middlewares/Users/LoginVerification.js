module.exports = (req, res, next) => {
    const paths = ['/users/register', '/users/login'];
    if (paths.includes(req.path)) return next();
    if (!req.body) return res.status(401).json({error: 'Usuário não autenticado'});
    if (!req.body.userID) return res.status(401).json({error: 'Usuário não autenticado'});
    next();
}