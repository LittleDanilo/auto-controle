const Users = require('../../Models/Users');

class UpdateUsersService {
    static async execute({fields}, id) {
        console.log(fields);
        try {
            let emailExistsQuery = []
            if (fields.email) emailExistsQuery = await Users.findOne({where: {email: fields.email}});
            if (emailExistsQuery && emailExistsQuery.id != id) throw new Error("Esse email já está atribuido a outro usuário.");
            const userUpdated = await Users.update(fields, {where: {id}});
            return userUpdated;
        } catch (err) {
            throw new Error(err.message || "Internal error.");
        }
    }
}

module.exports = UpdateUsersService;