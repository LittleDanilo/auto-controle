const SelectUsersService = require('../../Services/Users/SelectUsersService');

module.exports = async (req, res) => {
    try {
        let admin = false
        if (req.body.userID == 1) admin = true;
        const result = await SelectUsersService.execute(admin, {where: req.body.data});
        return res.status(200).json({status: 200, result: result});
    } catch (err) {
        return res.status(200).json({status: 400, error: err.message});
    }
}