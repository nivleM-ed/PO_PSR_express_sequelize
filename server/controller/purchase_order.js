let models = require('../models');
var sequelize = require('sequelize');
let loggerDebug = require('../logs/loggerDebug.js');
let loggerInfo = require('../logs/loggerInfo.js');
let loggerError = require('../logs/loggerError.js');

//working //not needed - just for testing purposes
exports.show_po_all = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'po',
        message: 'show_po_all'
    })
    return models.purchase_order.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(po => {
        res.send(po)
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'po_show_po_all',
            message: err
        })
        res.status(500).send(err);
    })
};

//WORKING
exports.show_po_page = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'po',
        message: 'show_po_page'
    })
    const limit = 8; //can be changed

    const po_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                // attributes: ['id', 'po_no', 'createdAt', 'po_date', 'delete_req', 'status_t1', 'status_t2'],
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then(po => {
                resolve(po);
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'po_show_po_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    const total_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.count({
                // attributes: [[sequelize.fn('COUNT', sequelize.col('id'))]]
            }).then(total => {
                resolve(Math.ceil(total/limit));
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'po_show_po_page_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([po_page(), total_page()])
        .then(result => {
            res.status(200).send({result});
        }).catch(err => {
            loggerError.log({
                level: 'error',
                label: 'po_show_po_page_promise',
                message: err
            })
            res.status(500).send(err);
        })
}

//show all po WITHOUT pagination
exports.show_all_po = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'po',
        message: 'show_all_po'
    })
    return models.purchase_order.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        res.status(500).send(err);
    })
}


//WORKING
//find po_no
exports.find = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'po',
        message: 'find'
    })
    return models.purchase_order.findOne({
        where: {
            po_no: req.params.po_no
        }
    }).then(po => {
        res.status(200).send(po)
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'po_find',
            message: err
        })
        res.status(500).send(err);
    })
}


//get po waiting to be accepted
exports.get_submits = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'po',
        message: 'get_submits'
    })
    const limit = 8; //can be changed

    const getSubmits = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                where: {
                    delete_req: false,
                    status_t1: false,
                    status_t2: false
                },
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then(po => {
                resolve(po)
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'po_get_submits',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getSubmitsTotal = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.count({
                where: {
                    delete_req: false,
                    status_t1: false,
                    status_t2: false
                },
            }).then(total => {
                resolve(Math.ceil(total/limit));
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'po_get_submits_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([getSubmits(req), getSubmitsTotal()])
        .then(result => {
            res.status(200).send({result});
        }).catch(err => {
            loggerError.log({
                level: 'error',
                label: 'po_get_submits_promise',
                message: err
            })
            res.status(500).send(err);
        })
}


//WORKING
//get po waiting to be approved
exports.get_pending = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'po',
        message: 'get_pending'
    })
    const limit = 8; //can be changed

    const getPending = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                where: {
                    delete_req: false,
                    status_t1: true,
                    status_t2: false
                },
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then(po => {
                resolve(po)
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'po_get_pending',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getPendingTotal = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                where: {
                    delete_req: false,
                    status_t1: true,
                    status_t2: false
                },
            }).then(total => {
                resolve(Math.ceil(total/limit));
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'po_get_pending_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([getPending(req), getPendingTotal()])
        .then(result => {
            res.status(200).send({result});
        }).catch(err => {
            loggerError.log({
                level: 'error',
                label: 'po_get_pending_promise',
                message: err
            })
            res.status(500).send(err);
        })
}

//WORKING
//add purchase order
exports.po_add = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'po',
        message: 'po_add'
    })
    return models.purchase_order.create({
        po_no: req.body.po_no,
        po_date: req.body.date,
        po_ref: req.body.po_ref,
        delv_due: req.body.due,
        ship_mode: req.body.ship,
        psr_no: req.body.psr,
        cca_no: req.body.cca,
        pay_mode: req.body.pay,
        address: req.body.address,
        po_desc: req.body.desc
    }).then(po => {
        res.status(201).send(po)
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'po_add',
            message: err
        })
        res.status(500).send(err);
    })
};

//WORKING
//show specific purchase order and description
exports.report = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'po',
        message: 'report'
    })
    return models.purchase_order.findOne({
        where: {
            id: req.params.po_id
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'po_report',
            message: err
        })
        res.status(500).send(err);
    })

};

//WORKING
//delete po
exports.po_del = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'po',
        message: 'po_del'
    })
    return models.purchase_order.destroy({
        where: {
            id: req.params.po_id
        }
    }).then(deleted => {
        res.status(200).send("deleted");
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'po_del',
            message: err
        })
        res.status(500).send(err);
    })
}

//WORKING
//update po
exports.po_upd = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'po',
        message: 'po_upd'
    })
    return models.purchase_order.update({
        po_no: req.body.po_no,
        po_date: req.body.date,
        po_ref: req.body.po_ref,
        delv_due: req.body.due,
        ship_mode: req.body.ship,
        psr_no: req.body.psr,
        cca_no: req.body.cca,
        pay_mode: req.body.pay,
        address: req.body.address,
        po_desc: req.body.desc
    }, {
        where: {
            id: req.params.po_id
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'po_upd',
            message: err
        })
        res.status(500).send(err);
    })
}

//WORKING
//update po status to pending
exports.po_stat_1 = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'po',
        message: 'po_stat_1'
    })
    return models.purchase_order.update({
        status_t1: true,
        date_pending: new Date()
    }, {
        where: {
            id: req.params.po_id
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'po_stat_1',
            message: err
        })
        res.status(500).send(err);
    })
}

//WORKING
//update po status to approve
exports.po_stat_2 = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'po',
        message: 'po_stat_2'
    })
    return models.purchase_order.update({
        status_t1: true,
        date_approve: new Date()
    }, {
        where: {
            id: req.params.po_id
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'po_stat_2',
            message: err
        })
        res.status(500).send(err);
    })
}