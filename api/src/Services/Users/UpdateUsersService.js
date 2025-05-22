const Users = require('../../Models/Users');
const SelectUsers = require("./SelectUsersService")

class UpdateUsersService {
    static async execute({fields}, id) {
        try {
            let emailExistsQuery = []
            if (fields.email) emailExistsQuery = await SelectUsers.execute(true, {where: {email: fields.email}})
            if (emailExistsQuery.length > 0) throw new Error("Esse email já está atribuido a outro usuário.")
            const userUpdated = await Users.update(fields, {where: {id: id}});
            return userUpdated;
        } catch (err) {
            throw new Error(err.message || "Internal error.");
        }
    }
}

module.exports = UpdateUsersService;