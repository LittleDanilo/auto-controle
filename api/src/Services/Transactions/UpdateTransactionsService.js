const Transacions = require('../../Models/Transactions');

class UpdateTransactionsService {
    static async execute({fields}, id) {
        try {
            const transaction = await Transacions.update(fields, {where: {id}});
            return transaction;
        } catch (err) {
            console.log(err);
            throw new Error(err.message || "Internal error.");
        }
    }
}

module.exports = UpdateTransactionsService;