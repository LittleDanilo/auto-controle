// requirements
const dotenv = require('dotenv').config();
const db = require('./src/Models/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// data base connection test
db.authenticate()
    .then(console.log("conexão bem-sucedida"))
    .catch((err) => {console.log(err)});

// Descomente e execute quando quiser criar as tabelas do seu banco de dados.
//db.sync({force:true});
// server config
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

