var express = require('express');
var router = express.Router();
let po = require('../controller/purchase_order');
let {isLoggedIn, auth_no_t1, auth_no_t1_t2} = require('../middleware/authenticate');


router.get('/', po.show_po_all); //for testing purpose
router.get('/all/:page', /* isLoggedIn,*/ po.show_po_page); //show all with pagination
router.get('/search/:po_no', isLoggedIn, po.find); //find for specific po_no

router.get('/submits', isLoggedIn, po.get_submits); //show all po submitted for approval
router.get('/pending', isLoggedIn, po.get_pending); //show all po that is pending for approval

router.post('/add_po', /* isLoggedIn,*/ po.po_add); //add po
router.delete('/del/:po_id', isLoggedIn, po.po_del); //delete po
router.get('/:po_id', isLoggedIn, po.report); //show specific purchase order

router.post('/:po_id/upd_po', isLoggedIn, po.po_upd); //update purchase order
router.post('/:po_id/pending', isLoggedIn, auth_no_t1, po.po_stat_1); //po status to pending
router.post('/:po_id/approve', isLoggedIn, auth_no_t1_t2, po.po_stat_2); //po status to approved  


module.exports = router;