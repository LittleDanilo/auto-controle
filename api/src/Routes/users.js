const express = require('express');
const router = express.Router();

router.post('/login', require('../Middlewares/Users/Login'), require('../Controllers/Users/Login'));
router.post('/register', require('../Middlewares/Users/Register'), require('../Controllers/Users/Register'));
router.post('/list', require('../Middlewares/Users/List'), require('../Controllers/Users/List'));
router.post('/update', require('../Middlewares/Users/Update'), require('../Controllers/Users/Update'));

module.exports = router;