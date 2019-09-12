var express = require('express');
var router = express.Router();

//insert requirements for controller files
var user = require('../controller/user');



/* GET home page. */
router.get('/', user.test);
router.post('/login', user.login);
router.post('/signup', user.signup);
router.post('/logout', user.logout);


module.exports = router;
