const express = require('express');
const router = express.Router();

router.get('/list', require('../Middlewares/Accounts/List'), require('../Controllers/Accounts/List'));
router.post('/register', require('../Middlewares/Accounts/Register'), require('../Controllers/Accounts/Register'));
router.post('/update', require('../Middlewares/Accounts/Update'), require('../Controllers/Accounts/Update'));

module.exports = router;