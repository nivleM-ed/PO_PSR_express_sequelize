let models = require('../models');
var sequelize = require('sequelize');
var winston = require('../logs/winston');
var CONST = require('../const');
const op = sequelize.Op;
const db = require('../models/index');

//WORKING
exports.show_po_page = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'show_po_page'
    })
    const limit = CONST.CONST_page_limit; //can be changed

    const po_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                // attributes: ['id', 'po_no', 'createdAt', 'po_date', 'delete_req', 'status_t1', 'status_t2'],
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                        model: models.Users,
                        required: true,
                        as: 'create_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't2_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't3_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'approver_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'del_req_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    }
                ]
            }).then(po => {
                resolve(po);
            }).catch(err => {
                winston.error({
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
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_show_po_page_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([po_page(req), total_page(req)])
        .then(result => {
            res.status(200).send({
                result
            });
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'po_show_po_page_promise',
                message: err
            })
            res.status(500).send(err);
        })
}

exports.show_own_po_page = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'show_own_po_page'
    })
    const limit = CONST.CONST_page_limit; //can be changed

    const po_own_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                // attributes: ['id', 'psr_no', 'createdAt', 'psr_date', 'delete_req', 'status_t1', 'status_t2'],
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                    model: models.Users,
                    required: true,
                    as: 'create_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't2_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 't3_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'approver_po',
                    attributes: ['username', 'firstname', 'lastname']
                },
                {
                    model: models.Users,
                    required: false,
                    as: 'del_req_user_po',
                    attributes: ['username', 'firstname', 'lastname']
                }
            ],
                where: {
                    create_user: req.user.id
                }
            }).then(po => {
                resolve(po);
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_show_own_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    const total_own_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.count({
                where: {
                    create_user: req.user.id
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_show_own_page_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([po_own_page(req), total_own_page(req)])
        .then(result => {
            res.status(200).send({
                result
            });
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'po_show_own_page_promise',
                message: err
            })
            res.status(500).send(err);
        })
}

//WORKING
//find po_no
exports.find = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'find'
    })

    return models.purchase_order.findOne({
        include: [{
                model: models.Users,
                required: true,
                as: 'create_user_po',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 't2_user_po',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 't3_user_po',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'approver_po',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'del_req_user_po',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.psr,
                required: false,
                as: 'psr',
                attributes: ['psr_no']
            }
        ],
        where: {
            po_no: req.params.po_no
        }
    }).then(po => {
        res.status(200).send(po)
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_find',
            message: err
        })
        res.status(500).send(err);
    })
}


//get po waiting to be accepted
exports.get_submits = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'get_submits'
    })
    const limit = CONST.CONST_page_limit; //can be changed

    const getSubmits = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                        model: models.Users,
                        required: false,
                        as: 'create_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't2_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't3_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'approver_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'del_req_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    }
                ],
                where: {
                    delete_req: false,
                    [op.or]: [{
                            status_t1_1: false
                        },
                        {
                            status_t1_2: false
                        }
                    ],
                    status_t2: false,
                    [op.or]: [{
                        t2_user: {
                            [op.not]: req.user.id
                        }
                    }, {
                        t2_user: {
                            [op.is]: null
                        }
                    }],
                    [op.or]: [{
                        t3_user: {
                            [op.not]: req.user.id
                        }
                    }, {
                        t3_user: {
                            [op.is]: null
                        }
                    }]
                } //t2_user_1 != req.user.id || t2_user_1 = null 
            }).then(po => {
                resolve(po)
            }).catch(err => {
                winston.error({
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
                    [op.or]: [{
                            status_t1_1: false
                        },
                        {
                            status_t1_2: false
                        }
                    ],
                    status_t2: false,
                    [op.or]: [{
                        t2_user_1: {
                            [op.not]: req.user.id
                        }
                    }, {
                        t2_user_1: {
                            [op.is]: null
                        }
                    }],
                    [op.or]: [{
                        t3_user: {
                            [op.not]: req.user.id
                        }
                    }, {
                        t3_user: {
                            [op.is]: null
                        }
                    }]
                } //t2_user_1 != req.user.id || t2_user_1 = null 
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_get_submits_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([getSubmits(req), getSubmitsTotal(req)])
        .then(result => {
            res.status(200).send({
                result
            });
        }).catch(err => {
            winston.error({
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
    winston.info({
        level: 'info',
        label: 'po',
        message: 'get_pending'
    })
    const limit = CONST.CONST_page_limit; //can be changed

    const getPending = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                where: {
                    delete_req: false,
                    status_t1_1: true,
                    status_t1_2: true,
                    status_t2: false
                },
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                        model: models.Users,
                        required: true,
                        as: 'create_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't2_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't3_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'approver_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'del_req_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    }
                ]
            }).then(po => {
                resolve(po)
            }).catch(err => {
                winston.error({
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
            return models.purchase_order.count({
                where: {
                    delete_req: false,
                    status_t1_1: true,
                    status_t1_2: true,
                    status_t2: false
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_get_pending_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([getPending(req), getPendingTotal(req)])
        .then(result => {
            res.status(200).send({
                result
            });
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'po_get_pending_promise',
                message: err
            })
            res.status(500).send(err);
        })
}

//WORKING
//get po waiting to be approved
exports.get_del_req = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'get_del_req'
    })
    const limit = CONST.CONST_page_limit; //can be changed

    const getDel = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                where: {
                    delete_req: true
                },
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                        model: models.Users,
                        required: true,
                        as: 'create_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't2_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't3_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'approver_po',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'del_req_user_po',
                        attributes: ['username', 'firstname', 'lastname']
                    }
                ]
            }).then(po => {
                resolve(po)
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_get_delreq',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getDelTotal = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.po.count({
                where: {
                    delete_req: true
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'po_get_delreq_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([getDel(req), getDelTotal(req)])
        .then(result => {
            res.status(200).send({
                result
            });
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'po_get_delreq_promise',
                message: err
            })
            res.status(500).send(err);
        })

}

//WORKING
//add purchase order
exports.po_add = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_add'
    })
    return models.purchase_order.create({
        po_ref: req.body.poObj._po_ref,
        quotation: req.body.poObj._quotation,
        delv_due: req.body.poObj._delv_due,
        ship_mode: req.body.poObj._ship_mode,
        psr_id: req.body.poObj._psr_id,
        cca_no: req.body.poObj._cca_no,
        pay_mode: req.body.poObj._pay_mode,
        address_1: req.body.poObj._address_1,
        address_2: req.body.poObj._address_2,
        address_3: req.body.poObj._address_3,
        address_4: req.body.poObj._address_4,
        po_desc: req.body.poObj._po_desc,
        cl_name: req.body.poObj._cl_name,
        cl_company: req.body.poObj._cl_company,
        create_user: req.user.id
    }).then(po => {
        res.status(201).send(po)
    }).catch(err => {
        winston.error({
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
    winston.info({
        level: 'info',
        label: 'po',
        message: 'report'
    })

    return models.purchase_order.findOne({
        include: [{
                model: models.Users,
                required: true,
                as: 'create_user_po',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 't2_user_po',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 't3_user_po',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'approver_po',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'del_req_user_po',
                attributes: ['username', 'firstname', 'lastname']
            }
        ]
    }, {
        where: {
            id: req.params.po_id
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_report',
            message: err
        })
        res.status(500).send(err);
    })

};

//request delete
exports.po_req_del = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_del_req'
    })
    return models.purchase_order.update({
        delete_req: true,
        del_user: req.user.id
    }, {
        where: {
            id: req.params.po_id,

        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_del_req',
            message: err
        })
        res.status(500).send(err);
    })
}

//WORKING
//approve delete po
exports.po_del = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_del'
    })
    return models.purchase_order.destroy({
        where: {
            id: req.params.po_id,
            delete_req: true
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_del',
            message: err
        })
        res.status(500).send(err);
    })
}

//decline delete request
exports.po_decline_del = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_del_decline'
    })
    return models.purchase_order.update({
        delete_req: false,
        del_user: null
    }, {
        where: {
            id: req.params.po_id,
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_del_decline',
            message: err
        })
        res.status(500).send(err);
    })
}


//WORKING
//update po
exports.po_upd = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_upd'
    })
    return models.purchase_order.update({
        po_ref: req.body.poObj._po_ref,
        quotation: req.body.poObj._quotation,
        delv_due: req.body.poObj._delv_due,
        ship_mode: req.body.poObj._ship_mode,
        psr_id: req.body.poObj._psr_id,
        cca_no: req.body.poObj._cca_no,
        pay_mode: req.body.poObj._pay_mode,
        address_1: req.body.poObj._address_1,
        address_2: req.body.poObj._address_2,
        address_3: req.body.poObj._address_3,
        address_4: req.body.poObj._address_4,
        po_desc: req.body.poObj._po_desc,
        cl_name: req.body.poObj._cl_name,
        cl_company: req.body.poObj._cl_company
    }, {
        where: {
            id: req.params.po_id
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        winston.error({
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
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_stat_1'
    })
    return models.purchase_order.findOne({
        where: {
            id: req.params.po_id
        }
    }).then(exist => {
        if (exist.status_t1_1) {
            if (req.user.id == exist.t3_user) {
                res.status(200).send({
                    err: "notAllowed"
                });
            } else {
                return models.purchase_order.update({
                    status_t1_2: true,
                    date_pending_2: new Date(),
                    t3_user: req.user.id
                }, {
                    where: {
                        id: req.params.po_id,
                        delete_req: {
                            [op.not]: true
                        }
                    }
                }).then(po => {
                    res.status(200).send(po);
                }).catch(err => {
                    winston.error({
                        level: 'error',
                        label: 'po_stat_1_1',
                        message: err
                    })
                    res.status(500).send(err);
                });
            }
        } else {
            if (req.user.id == exist.t2_user) {
                res.status(200).send({
                    err: "notAllowed"
                });
            } else {
                return models.purchase_order.update({
                    status_t1_1: true,
                    date_pending_1: new Date(),
                    t2_user: req.user.id
                }, {
                    where: {
                        id: req.params.po_id,
                        delete_req: {
                            [op.not]: true
                        }
                    }
                }).then(po => {
                    res.status(200).send(po);
                }).catch(err => {
                    winston.error({
                        level: 'error',
                        label: 'po_stat_1_2',
                        message: err
                    })
                    res.status(500).send(err);
                });
            }
        }
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_stat_1_3',
            message: err
        })
        res.status(500).send(err);
    })
}

//WORKING
//update po status to approve
exports.po_stat_2 = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_stat_2'
    })
    return models.purchase_order.update({
        status_t2: true,
        date_approve: new Date(),
        approver_user: req.user.id
    }, {
        where: {
            id: req.params.po_id
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_stat_2',
            message: err
        })
        res.status(500).send(err);
    })
}

//decline po
exports.po_stat_decline = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'po',
        message: 'po_stat_decline'
    })
    return models.purchase_order.update({
        status_decline: true,
        date_decline: new Date(),
        decline_user: req.user.id,
        decline_reason: req.body.poObj._decline_reason
    }, {
        where: {
            id: req.params.po_id
        }
    }).then(po => {
        res.status(200).send(po);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'po_stat_decline',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.search_po = function (req, res, next) {

    return db.sequelize
        .query('SELECT * from F_SEARCH_PO(:a, :b, :c, :d, :e, :f, :g, :h)', 
            {
                replacements: { 
                    a: req.body.poObj._in_param_1,  //in_str 
                    b: req.body.poObj._in_param_2,  //in_company,
                    c: req.body.poObj._in_param_3,  //in_date,
                    d: parseInt(req.body.poObj._in_param_4), //in_month
                    e: parseInt(req.body.poObj._in_param_5), //in_year
                    f: req.body.poObj._in_param_6,  //in_approve
                    g: parseInt(req.body.in_page) - 1,
                    h: parseInt(CONST.CONST_page_limit)
                }
            })
        .then( data => { 
            res.send(data[0]);
        }).catch(err => {
            res.status(500).send(err);
        });
}