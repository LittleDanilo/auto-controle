const Accounts = require('../../Models/Accounts');
const SelectUsersService = require('../../Services/Users/SelectUsersService');
const { Op } = require("sequelize");

class SelectAccountsService {
    static async execute({where}) {
        try {
            if (where.name) where.name = {[Op.like]: `%${String(where.name).trim()}%`};
            if (String(where.name).length <= 2) delete where.name;
            const result = await Accounts.findAll({where});
            if (result.length == 0) return "Conta não encontrada.";

            for (let i in result) {
                let user = await SelectUsersService.execute(1, {where: {id: result[i].createdBy}});
                result[i].createdBy = {
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                };

                user = await SelectUsersService.execute(1, {where: {id: result[i].updatedBy}});
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

module.exports = SelectAccountsService;