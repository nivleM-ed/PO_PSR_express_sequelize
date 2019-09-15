var express = require('express');
var router = express.Router();
var admin = require('../controller/user');

router.post('/login', admin.login);
router.post('/logout', admin.logout);

module.exports = router;