const RegisterTransactionsService = require('../../Services/Transactions/RegisterTransactionsService');

module.exports = async (req, res) => {
    try {
        const { origin, destiny, value, date, description } = req.body;
        const transaction = await RegisterTransactionsService.register(origin, destiny, value, date, description);
        return res.status(200).json({status: 200, transaction});
    } catch (err) {
        return res.status(500).json({status: 500, error: err.message});
    }
}