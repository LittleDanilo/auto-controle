const UpdateUsersService = require('../../Services/Users/UpdateUsersService');

module.exports = async (req, res) => {
    try{
        const {userID} = req.body.userID;
        const {fields, id} = req.body.data;
        fields.updatedBy = userID;
        const user = await UpdateUsersService.execute({fields}, id);
        return res.status(200).json({status: 200, result: user});
    } catch (err) {
        return res.status(200).json({status: 500, error: err.message})
    }
}