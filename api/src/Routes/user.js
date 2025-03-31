const express = require('express');
const router = express.Router();

router.post('/login', require('../Middlewares/Login'), require('../Controllers/Login'));

module.exports = router;