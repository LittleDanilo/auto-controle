// requirements
const dotenv = require('dotenv').config();
const {auth} = require('./src/Models/db');
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
        await delay(15000);
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
app.listen(process.env.API_PORT, process.env.API_HOST,() => {
    console.log('server online');
    console.log('Acesse http://localhost:5173');
});
