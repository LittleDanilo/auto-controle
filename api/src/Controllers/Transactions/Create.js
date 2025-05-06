const RegisterTransactionsService = require('../../Services/Transactions/RegisterTransactionsService');

module.exports = async (req, res) => {
    try {
        const {userID} = req.body;
        const { origin, destiny, value, date, description } = req.body.data;
        const result = await RegisterTransactionsService.register(userID, origin, destiny, value, date, description);
        return res.status(200).json({status: 200, result});
    } catch (err) {
        return res.status(200).json({status: 400, error: err.message});
    }
}