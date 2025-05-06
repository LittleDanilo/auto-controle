const Accounts = require('../../Models/Accounts');
const { Op } = require("sequelize");

class SelectAccountsService {
    static async execute({where}) {
        try {
            const result = await Accounts.findAll({where});
            if (result.length == 0) return "Conta não encontrada.";
            return result;
        } catch (err) {
            console.log(err);
            throw new Error(err.message || "Internal Error.");
        };
    }
}

module.exports = SelectAccountsService;