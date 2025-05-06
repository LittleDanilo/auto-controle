const RegisterTransactionsService = require('../../Services/Transactions/RegisterTransactionsService');

module.exports = async (req, res) => {
    try {
        const { origin, destiny, value, date, description } = req.body;
        const result = await RegisterTransactionsService.register(origin, destiny, value, date, description);
        return res.status(200).json({status: 200, result});
    } catch (err) {
        return res.status(200).json({status: 400, error: err});
    }
}