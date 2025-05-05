const SelectAccountsService = require('../../Services/Accounts/SelectAccountsService');

module.exports = async (req, res) => {
    try {
        const where = req.where;
        const result = await SelectAccountsService.execute({where});
        return res.status(200).json({status: 200, result: result});
    } catch (err) {
        return res.status(400).json({status: 400, error: err});
    }
}