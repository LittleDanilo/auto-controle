const express = require('express');
const router = express.Router();

router.post('/login', require('../Middlewares/Users/Login'), require('../Controllers/Users/Login'));
router.post('/register', require('../Middlewares/Users/Register'), require('../Controllers/Users/Register'));

module.exports = router;