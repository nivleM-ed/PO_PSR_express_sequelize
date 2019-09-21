let models = require('../models');
var sequelize = require('sequelize');

//working //not needed - just for testing purposes
exports.show_po_all = function(req, res, next) {
    return models.purchase_order.findAll({
        order: [['createdAt', 'DESC']]
    }).then(purchase_order => {
        res.send({po: purchase_order})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

//WORKING
exports.show_po_page = function(req, res, next) {
    const limit = 3; //can be changed

    return models.purchase_order.findAll({
        attributes: ['id', 'po_no', 'createdAt', 'po_date', 'delete_req', 'status_t1', 'status_t2'],
        limit: limit,
        offset: (req.params.page - 1) * limit,
        order: [['createdAt', 'DESC']]
    }).then(po => {
        resolve(po);
    }).catch(err => {
        res.status(500).send(err);
    })
}


//WORKING
//find po_no
exports.find = function(req, res, next) {
    return models.purchase_order.findOne({
        where: {
            po_no: req.params.po_no
        }
    }).then(purchase_order => {
        res.status(200).send({msg: "Get specific", result: purchase_order})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}


//get po waiting to be accepted
exports.get_submits = function(req, res, next) {
    return models.purchase_order.findAll({
        order: [['createdAt', 'DESC']]
    },{
        where: {
            delete_req: false,
            status_t1: false,
            status_t2: false
        },
    }).then(purchase_order => {
        res.status(200).send({result: purchase_order})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}


//WORKING
//get po waiting to be approved
exports.get_pending = function(req, res, next) {
    return models.purchase_order.findAll({
        where: {
            delete_req: false,
            status_t1: true,
            status_t2: false
        },
        order: [['createdAt', 'DESC']]
    }).then(purchase_order => {
        res.status(200).send({result: purchase_order})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//WORKING
//add purchase order
exports.po_add = function(req, res, next) {
    return models.purchase_order.create({
        po_no: req.body.po_no,
        address: req.body.address,
        po_date: Date.now(),
        po_desc: req.body.desc
        //more data to be added
    }).then(purchase_order => {
        res.status(201).send({po: purchase_order})
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
            id: req.params.po_id
        }
    }).then(po_dat => {
        res.status(200).send({res:po_dat});
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })

};

//WORKING
//delete po
exports.po_del = function(req, res, next) {
    return models.purchase_order.destroy({
        where: {
            id: req.params.po_id
        }
    }).then(deleted => {
            res.status(200).send();
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//WORKING
//update po
exports.po_upd = function(req, res, next) {
    return models.purchase_order.update({
        po_no: req.body.po_no,
        address: req.body.address,
        po_desc: req.body.desc
    }, {
        where: {
            id: req.params.po_id
        }    
        //more data to be added
    }).then(updated => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//WORKING
//update po status to pending
exports.po_stat_1 = function(req, res, next) {
    return models.purchase_order.update({
        status_t1: true,
        date_approve: req.body.date
    }, {
    where: {
        id: req.params.po_id
        }
    }).then(updated => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//WORKING
//update po status to approve
exports.po_stat_2 = function(req, res, next) {
    return models.purchase_order.update({
        status_t1: true,
        date_approve: req.body.date
    }, {
    where: {
        id: req.params.po_id
        }
    }).then(updated => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}