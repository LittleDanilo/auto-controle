module.exports = (req, res, next) => {
    if (!req.body.data) req.body.data = {};
    const {date, status} = req.body.data;
    if (date) req.body.data.date = new Date(date);
    if (status && !status in ['Pendente', 'Concluida', 'Cancelada']) res.status(200).json({status: 400, error: "Status inválido, precisa ser 'Pendente', 'Concluida' ou 'Cancelada'"})
    next();
}