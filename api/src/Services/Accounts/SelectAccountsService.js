const Accounts = require('../../Models/Accounts');

class SelectAccountsService {
    static async execute({where}) {
        try {
            const result = await Accounts.findAll({where});
            if (result.length == 0) return "Account not found.";
            return result;
        } catch (err) {
            console.log(err);
            throw new Error(err.message || "Internal Error.");
        };
    }
}

module.exports = SelectAccountsService;