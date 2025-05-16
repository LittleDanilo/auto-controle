// requirements
const dotenv = require('dotenv').config();
const databaseAuthenticate = require('./src/Libraries/databaseAuthenticate');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// routes
app.use(require('./src/Middlewares/Users/LoginVerification'));
app.use('/users', require('./src/Routes/users'));
app.use('/accounts', require('./src/Routes/accounts'));
app.use('/transactions', require('./src/Routes/transaction'));

// server
app.listen(process.env.API_PORT, process.env.API_HOST, async () => {
    await databaseAuthenticate()
    console.log('=========Server Online==========');
    console.log('Acesse http://localhost:5173');
});
