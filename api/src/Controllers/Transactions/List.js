const SelectTransactionsService = require('../../Services/Transactions/SelectTransactionsService');

module.exports = async (req, res) => {
    try {
        const result = await SelectTransactionsService.execute({where: req.body});
        return res.status(200).json({status: 200, result});
    } catch (err) {
        return res.status(200).json({status: 400, error: err});
    }
}