const UpdateAccountService = require('../../Services/Accounts/UpdateAccountService');

module.exports = async (req, res) => {
    try{
        let {fields, id} = req.body;
        fields = JSON.parse(fields);
        const account = await UpdateAccountService.execute({fields}, id);
        return res.status(200).json({status: 200, account: account});
    } catch (Error) {
        return res.status(400).json({error: Error});
    }
}