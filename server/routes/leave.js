var express = require('express');
var router = express.Router();
var leave = require('../controller/leave');

let {isLoggedIn, auth_no_t1, auth_no_t1_t2} = require('../middleware/authenticate');

router.get('/all', isLoggedIn, auth_no_t1, leave.show_all_leave);
router.get('/', /* isLoggedIn,*/ leave.show_own_leave);
router.get('/:leave_id', /* isLoggedIn,*/ leave.report);
router.post('/add_leave', /* isLoggedIn,*/ leave.add_leave);
router.post('/:leave_id/upd_leave', /* isLoggedIn,*/ leave.upd_leave);
router.delete('/:leave_id/del_leave', /* isLoggedIn,*/ leave.del_leave);
router.post('/:leave_id/upd', /* isLoggedIn,*/ leave.approve_leave);


module.exports = router;