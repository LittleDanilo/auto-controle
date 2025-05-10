const UpdateTransactionsService = require('../../Services/Transactions/UpdateTransactionsService');

module.exports = async (req, res) => {
    try{
        const {userID} = req.body;
        const {fields, id} = req.body.data;
        fields.updatedBy = userID;
        const result = await UpdateTransactionsService.execute({fields}, id);
        return res.status(200).json({status: 200, result});
    } catch (err) {
        return res.status(200).json({status: 400, error: err.message});
    }
}