const SelectAccountsService = require('../../Services/Accounts/SelectAccountsService');

module.exports = async (req, res) => {
    try {
        const filters = req.filters;
        console.log(filters);
        
        const result = await SelectAccountsService.execute({filters});
        return res.status(200).json({status: 200, result: result});
    } catch (err) {
        return res.status(400).json({status: 400, error: err});
    }
}