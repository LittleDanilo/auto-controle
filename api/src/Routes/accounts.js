const express = require('express');
const router = express.Router();

router.get('/list', require('../Middlewares/Accounts/List'), require('../Controllers/Accounts/List'));
router.post('/register', require('../Middlewares/Accounts/Register'), require('../Controllers/Accounts/Register'));

module.exports = router;