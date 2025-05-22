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
            for (let i in result){
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
        } catch(err) {
            throw new Error(err.message || "Internal error");
        }
    }
}

module.exports = SelectUsersService;