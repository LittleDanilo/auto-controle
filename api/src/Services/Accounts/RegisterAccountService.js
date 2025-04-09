const Account = require('../../Models/Accounts');

class RegisterAccountService {
    static async execute(name, description, type) {
        try {
            const account = await Account.create({
                name: name,
                description: description,
                type: type,
                status: 'Ativa'
            });
            return account;
        } catch (err) {
            console.log(err);
            throw new Error(err.message || 'Internal error.');
        }
    }
};

module.exports = RegisterAccountService;