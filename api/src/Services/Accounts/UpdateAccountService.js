const Accounts = require('../../Models/Accounts');

class UpdateAccountService {
    static async execute({fields}, id) {
        try {
            const account = await Accounts.update(fields, {where: {id: id}});
            return account;
        } catch (err) {
            throw new Error(err.message || "Internal error.");
        }
    }
}

module.exports = UpdateAccountService;