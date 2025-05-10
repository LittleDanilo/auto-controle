const Transacions = require('../../Models/Transactions');

class RegisterTransactionsService {
    static async register(userID, origin, destiny, value, date, description) {
        try {
            const transaction = await Transacions.create({
                createdBy: userID,
                updatedBy: userID,
                origin,
                destiny,
                description,
                value,
                date
            });
            return transaction;
        } catch (err) {
            throw new Error(err.message || 'Internal error');
        }
    }
}

module.exports = RegisterTransactionsService;