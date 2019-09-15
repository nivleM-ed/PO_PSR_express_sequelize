let models = require('../models');
var sequelize = require('sequelize');

//working //not needed - just for testing purporses
exports.show_psr_all = function(req, res, next) {
    return models.psr.findAll({
    }).then(psr => {
        res.send({psr: psr})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

//WORKING
exports.show_psr_page = function(req, res, next) {
    const limit = 3; //can be changed
    return models.psr.findAll({
        attributes: ['id', 'psr_no', 'createdAt', 'psr_date', 'delete_req', 'status_t1', 'status_t2'],
        limit: limit,
        offset: (req.params.page - 1) * limit,
        order: [['createdAt', 'DESC']]
    }).then(psr => {
        models.psr.findAll({
            attributes: [[sequelize.fn('count', sequelize.col('psr_no')), 'submit_count']],
            where : {
                delete_req : false,
                status_t1 : false,
                status_t2 : false
            }
        }).then(submit_count => {
            models.psr.findAll({
                attributes: [[sequelize.fn('count', sequelize.col('psr_no')), 'pending_count']],
                where : {
                    delete_req : false,
                    status_t1 : false,
                    status_t2 : false
                }
            }).then(pending_count => {
                models.psr.findAll({
                    attributes : [[sequelize.fn('count', sequelize.col('psr_no')), 'total_count']]
                }).then(total_count => {
                    res.status(200).send({result: psr, submit_count: submit_count, pending_count: pending_count, total_count: total_count})
                }).catch(err => {
                    res.status(500).send("Error -> " + err);
                })
            })
        })
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
        res.status(200).send({msg: "Get specific", result: psr})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//ISSUE column 'nan' cannot be found 
//get psr waiting to be accepted
exports.get_submits = function(req, res, next) {
    return models.psr.findAll({
        order: [['createdAt', 'DESC']]
    },{
        where: {
            delete_req: false,
            status_t1: false,
            status_t2: false
        },
    }).then(psr => {
        res.status(200).send({result: psr})
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
            status_t1: true,
            status_t2: false
        },
        order: [['createdAt', 'DESC']]
    }).then(psr => {
        res.status(200).send({result: psr})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//WORKING
//add purchase order
exports.psr_add = function(req, res, next) {
    return models.psr.create({
        psr_no: req.body.psr_no,
        address: req.body.address,
        psr_date: Date.now(),
        psr_desc: req.body.desc
        //more data to be added
    }).then(psr => {
        res.status(201).send({psr: psr})
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
};

//WORKING
//show specific purchase order and description
exports.repsrrt = function(req, res, next) {
    console.log(req.params.id);
    return models.psr.findOne({
        where: {
            id: req.params.id
        }
    }).then(psr_dat => {
        res.status(200).send({res:psr_dat});
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })

};

//WORKING
//delete psr
exports.psr_del = function(req, res, next) {
    return models.psr.destroy({
        where: {
            id: req.params.id
        }
    }).then(deleted => {
            res.status(200).send();
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//WORKING
//update psr
exports.psr_upd = function(req, res, next) {
    return models.psr.update({
        psr_no: req.body.psr_no,
        address: req.body.address,
        psr_desc: req.body.desc
    }, {
        where: {
            id: req.params.id
        }    
        //more data to be added
    }).then(updated => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//WORKING
//update psr status to pending
exports.psr_stat_1 = function(req, res, next) {
    return models.psr.update({
        status_t1: true
    }, {
    where: {
        id: req.params.id
        }
    }).then(updated => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

//WORKING
//update psr status to approve
exports.psr_stat_2 = function(req, res, next) {
    return models.psr.update({
        status_t2: true,
        date_approve: Date.now()
    }, {
    where: {
        id: req.params.id
        }
    }).then(updated => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

