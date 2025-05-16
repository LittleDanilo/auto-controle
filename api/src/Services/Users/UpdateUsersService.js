const Users = require('../../Models/Users');

class UpdateUsersService {
    static async execute({fields}, id) {
        try {
            const user = await Users.update(fields, {where: {id: id}});
            return user;
        } catch (err) {
            throw new Error(err.message || "Internal error.");
        }
    }
}

module.exports = UpdateUsersService;