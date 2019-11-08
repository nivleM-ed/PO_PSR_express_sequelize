let models = require('../models');
var sequelize = require('sequelize');
let loggerDebug = require('../logs/loggerDebug.js');
let loggerInfo = require('../logs/loggerInfo.js');
let loggerError = require('../logs/loggerError.js');
const op = sequelize.Op

//working //not needed - just for testing purporses
exports.show_psr_all = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'show_psr_all'
    })

    return models.psr.findAll({
        include: [{
                model: models.Users,
                required: true,
                as: 'create_user_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 't2_user_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 't2_user2_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'approver_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'del_req_user_psr',
                attributes: ['username', 'firstname', 'lastname']
            }
        ],
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(psr => {
        res.send(psr)
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'psr_show_psr_all',
            message: err
        })
        res.status(500).send(err);
    })
};

//WORKING  //send with pagination and total page number
exports.show_psr_page = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'show_psr_page'
    })
    dbJoin_psr();
    const limit = 10; //can be changed

    const psr_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.findAll({
                // attributes: ['id', 'psr_no', 'createdAt', 'psr_date', 'delete_req', 'status_t1', 'status_t2'],
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                        model: models.Users,
                        required: true,
                        as: 'create_user_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't2_user_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't2_user2_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'approver_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'del_req_user_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    }
                ]
            }).then(psr => {
                resolve(psr);
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'psr_show_psr_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    const total_page = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.count({
                // attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']]
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'psr_show_psr_page_total_page',
                    message: err
                })
                reject(err);
            })
        })
    }

    Promise.all([psr_page(req), total_page(req)])
        .then(result => {
            res.status(200).send({
                result
            });
        }).catch(err => {
            loggerError.log({
                level: 'error',
                label: 'psr_show_psr_page_promise',
                message: err
            })
            res.status(500).send(err);
        })
}


//show all psr WITHOUT pagination
exports.show_all_psr = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'show_all_psr'
    })
    dbJoin_psr();

    return models.psr.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        include: [{
                model: models.Users,
                required: true,
                as: 'create_user_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 't2_user_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 't2_user2_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'approver_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'del_req_user_psr',
                attributes: ['username', 'firstname', 'lastname']
            }
        ],
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        res.status(500).send(err);
    })
}

//WORKING
//find psr_no
exports.find = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'find'
    })
    dbJoin_psr();

    return models.psr.findOne({
        include: [{
                model: models.Users,
                required: true,
                as: 'create_user_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 't2_user_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 't2_user2_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'approver_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'del_req_user_psr',
                attributes: ['username', 'firstname', 'lastname']
            }
        ],
    }, {
        where: {
            psr_no: req.params.psr_no
        }
    }).then(psr => {
        res.status(200).send(psr)
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'psr_find',
            message: err
        })
        res.status(500).send(err);
    })
}

//get psr waiting to be accepted
exports.get_submits = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'get_submits'
    })
    dbJoin_psr();
    const limit = 10; //can be changed

    const getSubmits = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.findAll({
                limit: limit,
                offset: (req.params.page - 1) * limit,
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [{
                        model: models.Users,
                        required: true,
                        as: 'create_user_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't2_user_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't2_user2_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'approver_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'del_req_user_psr',
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
                        t2_user_1: {
                            [op.not]: req.user.id
                        }
                    }, {
                        t2_user_1: {
                            [op.is]: null
                        }
                    }]
                } //t2_user_1 != req.user.id || t2_user_1 = null 
            }).then(psr => {
                resolve(psr)
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'psr_get_submits',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getSubmitsTotal = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.count({
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
                    t2_user_1: {
                        [op.not]: req.user.id
                    }
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'psr_get_submits_total_page',
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
            loggerError.log({
                level: 'error',
                label: 'psr_get_submits_promise',
                message: err
            })
            res.status(500).send(err);
        })
}


//WORKING
//get psr waiting to be approved
exports.get_pending = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'get_pending'
    })
    dbJoin_psr();
    const limit = 10; //can be changed

    const getPending = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.findAll({
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
                        as: 'create_user_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't2_user_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't2_user2_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'approver_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'del_req_user_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    }
                ],
            }).then(psr => {
                resolve(psr)
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'psr_get_pending',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getPendingTotal = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.count({
                where: {
                    delete_req: false,
                    status_t1_1: true,
                    status_t1_2: true,
                    status_t2: false
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'psr_get_pending_total_page',
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
            loggerError.log({
                level: 'error',
                label: 'psr_get_pending_promise',
                message: err
            })
            res.status(500).send(err);
        })

}

//WORKING
//get psr waiting to be approved
exports.get_del_req = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'get_del_req'
    })
    dbJoin_psr();
    const limit = 10; //can be changed

    const getDel = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.findAll({
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
                        as: 'create_user_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't2_user_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 't2_user2_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'approver_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    },
                    {
                        model: models.Users,
                        required: false,
                        as: 'del_req_user_psr',
                        attributes: ['username', 'firstname', 'lastname']
                    }
                ],
            }).then(psr => {
                resolve(psr)
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'psr_get_delreq',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getDelTotal = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.count({
                where: {
                    delete_req: true
                }
            }).then(total => {
                resolve(Math.ceil(total / limit));
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'psr_get_delreq_total_page',
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
            loggerError.log({
                level: 'error',
                label: 'psr_get_delreq_promise',
                message: err
            })
            res.status(500).send(err);
        })

}

//WORKING
//add purchase order
exports.psr_add = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'add'
    })
    return models.psr.create({
        // psr_no: req.body.psr_no,
        // psr_date: req.body.date,
        psr_data: req.body.psr_data,
        purchase_class: req.body.pur_class,
        purchase_typ: req.body.pur_typ,
        purchase_just: req.body.pur_just,
        date_req: req.body.date_req,
        project_title: req.body.p_title,
        vessel_code: req.body.vessel_cd,
        delv: req.body.delv,
        psr_desc: req.body.desc,
        create_user: req.user.id
    }).then(psr => {
        res.status(201).send(psr)
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'psr_add',
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
        label: 'psr',
        message: 'report'
    })
    dbJoin_psr();

    return models.psr.findOne({
        include: [{
                model: models.Users,
                required: true,
                as: 'create_user_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 't2_user_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 't2_user2_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'approver_psr',
                attributes: ['username', 'firstname', 'lastname']
            },
            {
                model: models.Users,
                required: false,
                as: 'del_req_user_psr',
                attributes: ['username', 'firstname', 'lastname']
            }
        ],
    }, {
        where: {
            id: req.params.psr_id
        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'psr_report',
            message: err
        })
        res.status(500).send(err);
    })

};

//request delete
exports.psr_req_del = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'psr_del_req'
    })
    return models.psr.update({
        delete_req: true,
        del_user: req.user.id
    }, {
        where: {
            id: req.params.psr_id,

        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'psr_del_req',
            message: err
        })
        res.status(500).send(err);
    })
}

//WORKING
//approve delete psr
exports.psr_del = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'psr_del'
    })
    return models.psr.destroy({
        where: {
            id: req.params.psr_id,
            delete_req: true
        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'psr_del',
            message: err
        })
        res.status(500).send(err);
    })
}

//decline delete request
exports.psr_decline_del = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'psr_del_decline'
    })
    return models.psr.update({
        delete_req: false,
        del_user: null
    }, {
        where: {
            id: req.params.psr_id,
        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'psr_del_decline',
            message: err
        })
        res.status(500).send(err);
    })
}


//WORKING
//update psr
exports.psr_upd = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'psr_upd'
    })
    return models.psr.update({
        // psr_no: req.body.psr_no,
        psr_date: req.body.date,
        psr_data: req.body.psr_data,
        purchase_class: req.body.pur_class,
        purchase_typ: req.body.pur_typ,
        purchase_just: req.body.pur_just,
        date_req: req.body.date_req,
        project_title: req.body.p_title,
        vessel_code: req.body.vessel_cd,
        delv: req.body.delv,
        psr_desc: req.body.desc,
        status_decline: false,
        date_decline: null,
        decline_user: null,
        decline_reason: null
    }, {
        where: {
            id: req.params.psr_id
        }
        //more data to be added
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'psr_upd',
            message: err
        })
        res.status(500).send(err);
    })
}

//WORKING
//update psr status to pending
exports.psr_stat_1 = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'psr_stat_1'
    })
    return models.psr.findOne({
        where: {
            id: req.params.psr_id
        }
    }).then(exist => {
        if (exist.status_t1_1 == true) {
            if (req.user.id == exist.t2_user_1) {
                res.status(200).send({
                    err: "notAllowed"
                });
            } else {
                return models.psr.update({
                    status_t1_2: true,
                    date_pending_2: new Date(),
                    t2_user_2: req.user.id
                }, {
                    where: {
                        id: req.params.psr_id,
                        delete_req: {
                            [op.not]: true
                        }
                    }
                }).then(psr => {
                    res.status(200).send(psr);
                }).catch(err => {
                    loggerError.log({
                        level: 'error',
                        label: 'psr_stat_1_1',
                        message: err
                    })
                    res.status(500).send(err);
                });
            }
        } else {
            return models.psr.update({
                status_t1_1: true,
                date_pending_1: new Date(),
                t2_user_1: req.user.id
            }, {
                where: {
                    id: req.params.psr_id,
                    delete_req: {
                        [op.not]: true
                    }
                }
            }).then(psr => {
                res.status(200).send(psr);
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'psr_stat_1_2',
                    message: err
                })
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'psr_stat_1_3',
            message: err
        })
        res.status(500).send(err);
    })
}

//WORKING
//update psr status to approve
exports.psr_stat_2 = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'psr_stat_2'
    })
    return models.psr.update({
        status_t2: true,
        date_approve: new Date(),
        approver_user: req.user.id
    }, {
        where: {
            id: req.params.psr_id
        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'psr_stat_2',
            message: err
        })
        res.status(500).send(err);
    })
}

//decline psr
exports.psr_stat_decline = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'psr',
        message: 'psr_stat_decline'
    })
    return models.psr.update({
        status_decline: true,
        date_decline: new Date(),
        decline_user: req.user.id,
        decline_reason: req.body.decline_reason
    }, {
        where: {
            id: req.params.psr_id
        }
    }).then(psr => {
        res.status(200).send(psr);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'psr_stat_decline',
            message: err
        })
        res.status(500).send(err);
    })
}