var express = require('express');
var router = express.Router();
var user = require('../controller/user');
let {isLoggedIn, auth_no_t1, auth_no_t1_t2} = require('../middleware/authenticate');


/* GET home page. */
router.post('/login', user.login);
router.post('/logout', isLoggedIn, user.logout);
router.get('/count', isLoggedIn, user.getCounts);

module.exports = router;
