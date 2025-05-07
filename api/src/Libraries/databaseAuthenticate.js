const delay = require('./delay');
const db = require('../Models/db');
const Users = require('../Models/Users');

module.exports = async () => {
    let connected = false;
    while (connected != true) {
        await delay(3000);
        console.log("Trying to connect with database...");
        await delay(2000);
        try {
            await db.authenticate();
            var tables = await db.showAllSchemas();
            if (tables.length == 0) {
                await db.sync({force:true});
                await Users.create({
                    name: 'admin',
                    password: 'admin123',
                    email: 'admin@auto.controle',
                    status: 'Ativo'
                });
            }
            console.log("\n=======Database Connected=======");
            break;
        } catch (err) {
            console.log(`Error in database connection: ${err.message}`);
        }
    }
    return;
}