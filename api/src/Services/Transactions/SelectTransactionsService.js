const Transacions = require('../../Models/Transactions');

class SelectTransactionsService {
    static async execute({where}) {
        try {
            const result = await Transacions.findAll({where});
            if (result.length == 0) return "Transaction not found.";
            return result;
        } catch (err) {
            console.log(err);
            throw new Error(err.message || "Internal Error.");
        };
    }
}

module.exports = SelectTransactionsService;