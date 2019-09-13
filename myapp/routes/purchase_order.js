var express = require('express');
var router = express.Router();
var purchase_order = require('../controller/purchase_order');

/* purchase order module */
router.get('/', purchase_order.show_po_all); //for testing purpose
router.get('/all/:page', purchase_order.show_po_page); //show all with pagination
router.get('/search/:po_no', purchase_order.find); //find for specific po_no
router.get('/submits', purchase_order.get_submits); //show all po submitted for approval
router.get('/pending', purchase_order.get_pending); //show all po that is pending for approval
router.post('/add_po', purchase_order.po_add); //add po
router.delete('/del/:id', purchase_order.po_del); //delete po
router.get('/:id', purchase_order.report); //show specific purchase order
router.post('/:id/upd_po', purchase_order.po_upd); //update purchase order
router.post('/:id/pending', purchase_order.po_stat_1); //po status to pending
router.post('/:id/approve', purchase_order.po_stat_2); //po status to approved  




module.exports = router;

//submitted -> pending approval -> approved