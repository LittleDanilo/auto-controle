const RegisterAccountService = require('../../Services/Accounts/RegisterAccountService');

module.exports = async (req, res) => {
    try {
        var { name, description, type } = req.body;
        description = !description ? null : description;
        const account = await RegisterAccountService.execute(name, description, type);
        return res.status(200).json({status: 200, account: account});
    } catch (err) {
        return res.status(400).json({error: err});
    }
};