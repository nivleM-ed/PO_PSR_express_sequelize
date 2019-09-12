var express = require('express');
var router = express.Router();
var purchase_order = require('../controller/purchase_order');

/* purchase order module */
router.get('/', purchase_order.show_po_all); //for testing purpose
router.get('/all/:page', purchase_order.show_po_page);
router.post('/add_po', purchase_order.po_add);
router.post('/add_po_dat/:id', purchase_order.po_add_data); //no show. add data to purchase_order_data
router.get('/po_desc/:id' , purchase_order.show_sig_data); //show all data of 1 purchase order
// router.delete('/del_po', purchase_order.po_del);
router.get('/:id', purchase_order.report); //show specific purchase order
// router.post('/:id/upd_po', purchase_order.po_upd); //update purchase order
// router.post('/:id/upd_po_dat/:desc_id', purchase_order.po_upd_data); //update data in purchase order


module.exports = router;