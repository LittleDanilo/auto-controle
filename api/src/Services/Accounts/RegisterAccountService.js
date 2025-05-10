const Account = require('../../Models/Accounts');

class RegisterAccountService {
    static async execute(userID, name, description, type) {
        try {
            const account = await Account.create({
                createdBy: userID,
                updatedBy: userID,
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