var express = require('express');
var router = express.Router();
var psr = require('../controller/psr');

let {isLoggedIn, auth_no_t1, auth_no_t1_t2} = require('../middleware/authenticate');

/* psr module */
router.get('/', psr.show_psr_all); //for testing purpose
router.get('/all/:page', isLoggedIn, psr.show_psr_page); //show all with pagination
router.get('/search/:psr_no', isLoggedIn, psr.find); //find for specific psr_no

router.get('/submits', isLoggedIn, psr.get_submits); //show all psr submitted for approval
router.get('/pending', isLoggedIn, psr.get_pending); //show all psr that is pending for approval

router.post('/add_psr', isLoggedIn, psr.psr_add); //add psr
router.delete('/del/:id', isLoggedIn, psr.psr_del); //delete psr
router.get('/:id', isLoggedIn, psr.report); //show specific psr

router.post('/:id/upd_psr', isLoggedIn, psr.psr_upd); //update psr
// router.post('/:id/pending', isLoggedIn, auth_no_t1_t1, psr.psr_stat_1); //psr status to pending
// router.post('/:id/approve', isLoggedIn, auth_no_t1_t2, psr.psr_stat_2); //psr status to approved  




module.exports = router;

//submitted -> pending approval -> approved