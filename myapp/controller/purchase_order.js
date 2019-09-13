let models = require('../models');
var sequelize = require('sequelize');

//working //not needed - just for testing purposes
exports.show_po_all = function(req, res, next) {
    return models.purchase_order.findAll({
    }).then(purchase_order => {
        res.send({po: purchase_order})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

exports.show_po_page = function(req, res, next) {
    const limit = 3; //can be changed
    return models.purchase_order.findAll({
        attributes: ['id', 'po_no', 'createdAt', 'po_date'],
        limit: limit,
        offset: (req.params.page - 1) * limit,
        order: [['createdAt', 'DESC']]
    }).then(purchase_order => {
        models.purchase_order.findAll({
            attributes: ['po_no', [sequelize.fn('count', sequelize.col('po_no')), 'submit_count']],
            group : ['purchase_order.po_no'],
            where : {
                delete_req : false,
                status_t1 : false,
                status_t2 : false
            }
        })
    }).then(submit_count => {
        models.purchase_order.findAll({
            attributes: ['po_no', [sequelize.fn('count', sequelize.col('po_no')), 'pending_count']],
            group : ['purchase_order.po_no'],
            where : {
                delete_req : false,
                status_t1 : false,
                status_t2 : false
            }
        })
    }).then(pending_count => {
        res.send({result: purchase_order, submit_count: submit_count, pending_count: pending_count})
    }).catch(err => {
    res.status(500).send("Error -> " + err);
})
}

exports.find = function(req, res, next) {
    return models.purchase_order.findOne({
        where: {
            po_no: req.params.po_no
        }
    }).then(purchase_order => {
        res.send({msg: "Get specific", result: purchase_order})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

exports.get_submits = function(req, res, next) {
    return models.purchase_order.findAndCountAll({
        where: {
            delete_req: false,
            status_t1: false,
            status_t2: false
        },
        order: [['createdAt', 'DESC']]
    }).then(purchase_order => {
        res.send({msg:"Get submitted po", result: purchase_order})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

exports.get_pending = function(req, res, next) {
    return models.purchase_order.findAndCountAll({
        where: {
            delete_req: false,
            status_t1: true,
            status_t2: false
        },
        order: [['createdAt', 'DESC']]
    }).then(purchase_order => {
        res.send({msg:"Get pending po", result: purchase_order})
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
        address: req.body.address,
        po_date: Date.now(),
        po_desc: req.body.desc
        //more data to be added
    }).then(purchase_order => {
        res.send({msg:'created', po: purchase_order})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

//WORKING
//show specific purchase order and description
exports.report = function(req, res, next) {
    console.log(req.params.id);

    return models.purchase_order.findOne({
        where: {
            id: req.params.id
        }
    }).then(po_dat => {
        res.send({res:po_dat});
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })

};

exports.po_del = function(req, res, next) {
    return models.purchase_order_data.delete({
        where: {
            po_id: req.params.id
        }
    })
}

// exports.po_upd = function(req, res, next) {
    
// }

