// requirements
const dotenv = require('dotenv').config();
const db = require('./src/Models/db');
const express = require('express');
const bodyParser = require('body-parser');

// data base connection test
db.authenticate()
    .then(console.log("conexão bem-sucedida"))
    .catch((err) => {console.log(err)});

// server config
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/user', require('./src/Routes/user'));
app.use('/accounts', require('./src/Routes/accounts'));

app.listen(process.env.PORT, () => {
    console.log('server online');
});