let models = require('../models');

//working //not needed - just for testing purposes
exports.show_po_all = function(req, res, next) {
    return models.purchase_order.findAll({
    }).then(purchase_order => {
        res.send({po: purchase_order})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

//working
//show all existing purchase order with a 20 limit pagination
exports.show_po_page = function(req, res, next) {
    const limit = 20;

    return models.purchase_order.findAll({
        attributes: ['po_no', 'po_date'],
        limit: limit,
        offset: (req.params.page - 1) * limit
    }).then(purchase_order => {
        res.send({po_array: purchase_order})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//working
//add purchase order
exports.po_add = function(req, res, next) {
    console.log("po_no:", req.body.po_no);

    return models.purchase_order.create({
        po_no: req.body.po_no,
        address: req.body.address
        //more data to be added
    }).then(purchase_order => {
        res.send({msg:'created', po: purchase_order})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

//working
//add a description to a purchase order
//1 purchase order can have many descriptions
exports.po_add_data = function(req, res, next) {
    console.log(req.params.id);
    return models.purchase_order_data.create({
        po_id: req.params.id,
        desc: req.body.text
    }).then(data => {
        res.send()
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

//working
//show all description of a single purchase order
exports.show_sig_data = function(req, res, next) {
    return models.purchase_order_data.findAll({
        where: {
            po_id: req.params.id
        }
    }).then(data => {
        res.send({msg:'created', po: data})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

//WORKING
//show specific purchase order and description
exports.report = function(req, res, next) {
    console.log(req.params.id);
    var sendFile;

    return models.purchase_order.findOne({
        where: {
            id: req.params.id
        }
    }).then(po_dat => {
        return models.purchase_order_data.findAll({
            where: {
                po_id: req.params.id
            }
        }).then(data => {
            res.send({po:po_dat, data:data});
        })
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })

    res.send({po: sendFile})
};



// exports.po_del = function(req, res, next) {
    
// }

// exports.po_upd = function(req, res, next) {
    
// }

