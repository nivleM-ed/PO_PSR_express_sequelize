var express = require('express');
var router = express.Router();
var purchase_order = require('../controller/psr');

let {isLoggedIn, auth_no_t1, auth_no_t1_t2} = require('../middleware/authenticate');

router.get('/', purchase_order.show_po_all); //for testing purpose
router.get('/all/:page', isLoggedIn, purchase_order.show_po_page); //show all with pagination
router.get('/search/:po_no', isLoggedIn, purchase_order.find); //find for specific po_no

router.get('/submits', isLoggedIn, purchase_order.get_submits); //show all po submitted for approval
router.get('/pending', isLoggedIn, purchase_order.get_pending); //show all po that is pending for approval

router.post('/add_po', isLoggedIn, purchase_order.po_add); //add po
router.delete('/del/:id', isLoggedIn, purchase_order.po_del); //delete po
router.get('/:id', isLoggedIn, purchase_order.report); //show specific purchase order

router.post('/:id/upd_po', isLoggedIn, purchase_order.po_upd); //update purchase order
router.post('/:id/pending', isLoggedIn, auth_no_t1, purchase_order.po_stat_1); //po status to pending
router.post('/:id/approve', isLoggedIn, auth_no_t1_t2, purchase_order.po_stat_2); //po status to approved  


module.exports = router;