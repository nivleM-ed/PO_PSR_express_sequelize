var express = require('express');
var router = express.Router();
var user = require('../controller/user');

/* GET home page. */
router.post('/login', user.login);
router.post('/logout', user.logout);
router.get('/count', user.getCounts);

module.exports = router;
