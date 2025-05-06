const UpdateTransactionsService = require('../../Services/Transactions/UpdateTransactionsService');

module.exports = async (req, res) => {
    try{
        let {fields, id} = req.body;
        const result = await UpdateTransactionsService.execute({fields}, id);
        return res.status(200).json({result});
    } catch (err) {
        return res.status(200).json({error: err});
    }
}