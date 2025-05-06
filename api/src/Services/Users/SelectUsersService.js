const Users = require('../../Models/Users');

class SelectUsersService {
    static async execute(where) {
        try {
            const result = await Users.findAll({where});
            if (result.length == 0) return "Transação não encontrada";
            return result;
        } catch(err) {
            throw new Error(err.message);
        }
    }
}

module.exports = SelectUsersService;