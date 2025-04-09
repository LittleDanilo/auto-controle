const Accounts = require('../../Models/Accounts');

class SelectAccountsService {
    static async execute({filters}) {
        try {
            const accounts = await Accounts.findAll({where: filters});
            return accounts;
        } catch (err) {
            console.log(err);
            throw new Error(err.message || "Internal Error.");
        };
    }
}

module.exports = SelectAccountsService;