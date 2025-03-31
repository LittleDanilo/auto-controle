const Users = require('../Models/Users');

class AuthService {
    static async userAuthentication(email, password) {
        const user = await Users.findOne({where: {email: email}});

        if (!user) {
            throw new Error('User not found.');
        }
        if (password != user.password) {
            throw new Error('Invalid password.');
        }
        return user;
    }
}

module.exports = AuthService;