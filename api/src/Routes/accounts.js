const express = require('express');
const router = express.Router();

router.post('/register', require('../Middlewares/Accounts/Register'), require('../Controllers/Accounts/Register'));

module.exports = router;