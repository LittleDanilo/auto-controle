const Users = require('../../Models/Users');
const {Op} = require('sequelize');

class SelectUsersService {
    static async execute({where}) {
        try {
            if (where.name) where.name = {name: {[Op.like]: `%${where.name}%`}};
            const result = await Users.findAll({where});
            if (result.length == 0) return "Usuário não encontrada";
            return result;
        } catch(err) {
            throw new Error(err.message || "Internal error");
        }
    }
}

module.exports = SelectUsersService;