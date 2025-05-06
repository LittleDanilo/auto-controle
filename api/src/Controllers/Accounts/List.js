const SelectAccountsService = require('../../Services/Accounts/SelectAccountsService');
const {Op} = require('sequelize');

module.exports = async (req, res) => {
    try {
        let where = {};
        const {id, name, type, status} = req.body.data;

        if (id) where.id = id;
        if (name) where.name = {[Op.like]: `%${name}%`};
        if (type) where.type = type;
        if (status) where.status = status;

        const result = await SelectAccountsService.execute({where});
        return res.status(200).json({status: 200, result: result});
    } catch (err) {
        return res.status(400).json({status: 400, error: err});
    }
}