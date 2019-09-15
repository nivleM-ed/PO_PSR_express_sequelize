var express = require('express');
var router = express.Router();
var admin = require('../controller/admin');

let {isLoggedIn, auth_admin} = require('../middleware/authenticate');

router.post('/admin_add', admin.add_admin); //ONLY FOR DEV 

router.post('/login', admin.admin_login);
router.post('/logout', isLoggedIn, admin.admin_logout);
router.get('/get_all', isLoggedIn, auth_admin, admin.get_all_user); 
router.post('/new_user', isLoggedIn, auth_admin, admin.add_user); //add user
router.delete('/:id/del_user', isLoggedIn, auth_admin, admin.del_user); //delete user
router.post('/:id/upd_tier', isLoggedIn, auth_admin, admin.update_tier); //update tier of user


module.exports = router;