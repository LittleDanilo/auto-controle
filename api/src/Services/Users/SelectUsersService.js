const Users = require('../../Models/Users');
const {Op} = require('sequelize');

class SelectUsersService {
    static async execute(admin ,{where}) {
        try {
            if (where.name) where.name = {[Op.like]: `%${String(where.name).trim()}%`};
            if (String(where.name).length <= 2) delete where.name;
            if (!admin) where.id = {[Op.not]: 1}
            const result = await Users.findAll({where});
            if (result.length == 0) return "Usuário não encontrado";
            return result;
        } catch(err) {
            throw new Error(err.message || "Internal error");
        }
    }
}

module.exports = SelectUsersService;