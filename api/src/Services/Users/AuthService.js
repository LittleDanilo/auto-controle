const Users = require('../../Models/Users');

class AuthService {
    static async userAuthentication(email, password) {
        const user = await Users.findOne({where: {email: email}});
        if (!user || user == null) throw new Error('Usuário não encontrado');
        if (password != user.password) throw new Error('Senha inválida.');
        return user;
    }
}

module.exports = AuthService;