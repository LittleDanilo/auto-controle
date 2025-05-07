const UpdateAccountService = require('../../Services/Accounts/UpdateAccountService');

module.exports = async (req, res) => {
    try{
        const {userID} = req.body;
        const {fields, id} = req.body.data;
        fields.updatedBy = userID;
        const account = await UpdateAccountService.execute({fields}, id);
        return res.status(200).json({status: 200, result: account});
    } catch (err) {
        return res.status(200).json({status: 400, error: err.message});
    }
}