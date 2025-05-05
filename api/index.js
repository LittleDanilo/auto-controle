// requirements
const dotenv = require('dotenv').config();
const {db, auth} = require('./src/Models/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// data base connection test
let connected = false;
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function test() {
    while (connected != true) {
        await delay(5000);
        console.log("try");
        connected = await auth();
    }
    console.log("connected");
}
test();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors('http://localhost:5173'));

// routes
app.use('/users', require('./src/Routes/users'));
app.use('/accounts', require('./src/Routes/accounts'));
app.use('/transactions', require('./src/Routes/transaction'));

// server
app.listen(process.env.PORT, () => {
    console.log('server online');
});
