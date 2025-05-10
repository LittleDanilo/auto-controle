const Transacions = require('../../Models/Transactions');
const SelectUsersService = require('../Users/SelectUsersService');

class SelectTransactionsService {
    static async execute({where}) {
        try {
            const result = await Transacions.findAll({where});
            if (result.length == 0) return "Transação não encontrada";
            for (let i in result){
                let user = await SelectUsersService.execute({id: result[i].createdBy});
                result[i].createdBy = {
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                };

                user = await SelectUsersService.execute({id: result[i].updatedBy});
                result[i].updatedBy = {
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                };
            }
            return result;
        } catch (err) {
            console.log(err);
            throw new Error(err.message || "Internal Error.");
        };
    }
}

module.exports = SelectTransactionsService;