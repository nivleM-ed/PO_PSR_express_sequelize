var express = require('express');
var router = express.Router();
var purchase_order = require('../controller/purchase_order');

/* purchase order module */
router.get('/', purchase_order.show_po_all); //for testing purpose
router.get('/all/:page', purchase_order.show_po_page); //show all with pagination
router.get('/all/search/:po_no', purchase_order.find); //find for specific po_no
router.get('/all/search/submits', purchase_order.get_submits); //show all po submitted for approval
router.get('/all/search/pending', purchase_order.get_pending); //show all po that is pending for approval
router.post('/add_po', purchase_order.po_add);
router.delete('/del/:id', purchase_order.po_del); //delete po
router.get('/:id', purchase_order.report); //show specific purchase order
// router.post('/:id/upd_po', purchase_order.po_upd); //update purchase order
// router.post('/:id/upd_po_dat/:desc_id', purchase_order.po_upd_data); //update data in purchase order


module.exports = router;

//submitted -> pending approval -> approved