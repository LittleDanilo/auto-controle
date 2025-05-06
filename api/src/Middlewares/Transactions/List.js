module.exports = (req, res, next) => {
    if (!req.body) req.body = {};
    const {date, status} = req.body;
    if (date) {
        const [day, month, year] = formDate.split('/');
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        req.body.date = formattedDate;
    }
    if (status && !status in ['Pendente', 'Concluida', 'Cancelada']) res.status(200).json({status: 400, error: "Status inválido, precisa ser 'Pendente', 'Concluida' ou 'Cancelada'"})
    next();
}