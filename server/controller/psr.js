let models = require('../models');
var sequelize = require('sequelize');

//working //not needed - just for testing purporses
exports.show_psr_all = function(req, res, next) {
    return models.psr.findAll({
    }).then(psr => {
        res.send(psr)
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

//WORKING
exports.show_psr_page = function(req, res, next) {
    const limit = 3; //can be changed

    return models.psr.findAll({
        // attributes: ['id', 'psr_no', 'createdAt', 'psr_date', 'delete_req', 'status_t1', 'status_t2'],
        limit: limit,
        offset: (req.params.page - 1) * limit,
        order: [['createdAt', 'DESC']]
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        res.status(500).send(err);
    })
}

//WORKING
//find psr_no
exports.find = function(req, res, next) {
    return models.psr.findOne({
        where: {
            psr_no: req.params.psr_no
        }
    }).then(psr => {
        res.status(200).send(psr)
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//ISSUE column 'nan' cannot be found 
//get psr waiting to be accepted
exports.get_submits = function(req, res, next) {
    return models.psr.findAll({
        where: {
            delete_req: false,
            status_t1: false,
            status_t2: false
        },
        limit: limit,
        offset: (req.params.page - 1) * limit,
        order: [['createdAt', 'DESC']]
    }).then(psr => {
        res.status(200).send(psr)
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}


//WORKING
//get psr waiting to be approved
exports.get_pending = function(req, res, next) {
    return models.psr.findAll({
        where: {
            delete_req: false,
            status_t1: false,
            status_t2: false
        },
        limit: limit,
        offset: (req.params.page - 1) * limit,
        order: [['createdAt', 'DESC']]
    }).then(psr => {
        res.status(200).send(psr)
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//WORKING
//add purchase order
exports.psr_add = function(req, res, next) {
    return models.psr.create({
        psr_no: req.body.psr_no,
        psr_date: req.body.date,
        psr_data: req.body.psr_data,
        purchase_class: req.body.pur_class,
        purchase_typ: req.body.pur_typ,
        purchase_just: req.body.pur_just,
        date_req: req.body.date_req,
        project_title: req.body.p_title,
        vessel_code: req.body.vessel_cd,
        delv: req.body.delv,        
        psr_desc: req.body.desc
    }).then(psr => {
        res.status(201).send(psr)
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

//WORKING
//show specific purchase order and description
exports.report = function(req, res, next) {
    console.log(req.params.id);
    return models.psr.findOne({
        where: {
            id: req.params.psr_id
        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })

};

//WORKING
//delete psr
exports.psr_del = function(req, res, next) {
    return models.psr.destroy({
        where: {
            id: req.params.psr_id
        }
    }).then(psr => {
            res.status(200).send(psr);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//WORKING
//update psr
exports.psr_upd = function(req, res, next) {
    return models.psr.update({
        psr_no: req.body.psr_no,
        psr_date: req.body.date,
        psr_data: req.body.psr_data,
        purchase_class: req.body.pur_class,
        purchase_typ: req.body.pur_typ,
        purchase_just: req.body.pur_just,
        date_req: req.body.date_req,
        project_title: req.body.p_title,
        vessel_code: req.body.vessel_cd,
        delv: req.body.delv,        
        psr_desc: req.body.desc
    }, {
        where: {
            id: req.params.psr_id
        }    
        //more data to be added
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//WORKING
//update psr status to pending
exports.psr_stat_1 = function(req, res, next) {
    return models.psr.update({
        status_t1: true,
        date_approve: new Date()
    }, {
    where: {
        id: req.params.psr_id
        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//WORKING
//update psr status to approve
exports.psr_stat_2 = function(req, res, next) {
    return models.psr.update({
        status_t2: true,
        date_approve: new Date()
    }, {
    where: {
        id: req.params.psr_id
        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

