const { Sequelize } = require('sequelize');
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_ROOT_PASSWORD, {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST
});

const auth = async () => {
    try {
        await db.authenticate();
        var tables = await db.showAllSchemas();
        if (tables.length == 0) db.sync({force:true});
        console.log("Database Connected");
        return true;
    } catch (err) {
        console.log(err.message);
        return false
    }
};

module.exports = {db, auth};