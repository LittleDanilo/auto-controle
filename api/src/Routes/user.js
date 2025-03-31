const express = require('express');
const router = express.Router();

router.post('/login', require('../Middlewares/User/Login'), require('../Controllers/User/Login'));
router.post('/register', require('../Middlewares/User/Register'), require('../Controllers/User/Register'));

module.exports = router;