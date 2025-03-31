const express = require('express');
const router = express.Router();

router.post('/login', require('../Middlewares/User/Login'), require('../Controllers/User/Login'));

module.exports = router;