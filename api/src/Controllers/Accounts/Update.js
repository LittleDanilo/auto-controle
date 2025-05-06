const UpdateAccountService = require('../../Services/Accounts/UpdateAccountService');

module.exports = async (req, res) => {
    try{
        let {fields, id} = req.body.data;
        const account = await UpdateAccountService.execute({fields}, id);
        return res.status(200).json({status: 200, result: account});
    } catch (err) {
        return res.status(200).json({status: 400, error: err});
    }
}