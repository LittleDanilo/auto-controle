const express = require('express');
const router = express.Router();

router.post('/register', require('../Middlewares/Transactions/Create'), require('../Controllers/Transactions/Create'));
router.post('/list', require('../Middlewares/Transactions/List'), require('../Controllers/Transactions/List'));
router.post('/update', require('../Middlewares/Transactions/Update'), require('../Controllers/Transactions/Update'));

module.exports = router;