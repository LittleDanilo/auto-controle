// requirements
const dotenv = require('dotenv').config();
const { Sequelize, db } = require('./src/Models/db');
const express = require('express');

// data base connection test
db.authenticate()
    .then(console.log("conexão bem-sucedida"))
    .catch((err) => {console.log(err)});

// server config
const app = express();

app.listen(process.env.PORT, () => {
    console.log('server online');
});