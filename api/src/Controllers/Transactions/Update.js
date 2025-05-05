const UpdateTransactionsService = require('../../Services/Transactions/UpdateTransactionsService');

module.exports = async (req, res) => {
    try{
        let {fields, id} = req.body;
        const transaction = await UpdateTransactionsService.execute({fields}, id);
        return res.status(200).json({status: 200, transaction});
    } catch (Error) {
        return res.status(400).json({error: Error});
    }
}