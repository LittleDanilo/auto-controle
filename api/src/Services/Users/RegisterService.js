const User = require('../../Models/Users');

class RegisterService {
    static async userRegister(name, email, password) {
        try {
            const test = await User.findOne({where: {email: email}});
            if (test) throw new Error('Usuário já existe.');

            const user = await User.create({
                name: name,
                email: email,
                password : password,
                status: "Ativo"
            });
            return user;
        } catch (err) {
            throw new Error(err.message || 'Internal error');
        }
    }
}

module.exports = RegisterService;