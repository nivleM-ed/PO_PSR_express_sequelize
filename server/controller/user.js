let models = require('../models');
let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
const {
    isEmpty
} = require('lodash');
const {
    validateUser
} = require('../validators/signup');
var sequelize = require('sequelize');
const op = sequelize.Op;
var winston = require('../logs/winston');

const generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

//login
exports.login = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'user',
        message: 'login'
    })
    passport.authenticate('local', {
        session: true
    }, function (err, user, info) {
        if (err) {
            res.send(err);
        } else if (!user) {
            res.send(info);
        } else {
            req.logIn(user, function (err) {
                if (req.app.settings.env === 'development') {
                    winston.debug({
                        level: 'debug',
                        label: 'user_login',
                        message: user.username
                    })
                }
                if (err) {
                    winston.error({
                        level: 'error',
                        label: 'user_login',
                        message: err
                    })
                    return res.send(err)
                }
                return res.send(user);
            })
        }
    })(req, res, next);
}

//check if logged in
exports.check_logged = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'user',
        message: 'check_logged'
    })
    try {
        if (req.user)
            res.status(200).send({
                id: req.user.id
            });
        else {
            winston.info({
                level: 'info',
                label: 'check_logged',
                message: 'noPermission'
            })
            res.send({
                err: "noPermission"
            });
        }
    } catch (error) {
        winston.error({
            level: 'error',
            label: 'check_logged',
            message: error
        })
        res.send({
            error: "systemErr"
        })
    }
}

//logout
exports.logout = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'user',
        message: 'logout'
    })
    req.logout();
    req.session.destroy();
    res.status(200).send({
        logout: "logout"
    });
}


//get counts
exports.getCounts = function (req, res, next) {
    const getNew_po = (req, res, next) => {
        winston.info({
            level: 'info',
            label: 'user',
            message: 'get_new_po'
        })
        return new Promise((resolve, reject) => {
            return models.purchase_order.count({
                // attributes: [
                //     [sequelize.fn('count', sequelize.col('po_no')), 'new_count_po']
                // ],
                where: {
                    delete_req: false,
                    status_t1: false,
                    status_t2: false
                }
            }).then(countPending => {
                resolve(countPending);
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'user_new_po',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getPending_po = (req, res, next) => {
        return new Promise((resolve, reject) => {
            winston.info({
                level: 'info',
                label: 'user',
                message: 'get_pending_po'
            })
            return models.purchase_order.count({
                // attributes: [
                //     [sequelize.fn('count', sequelize.col('po_no')), 'pending_count_po']
                // ],
                where: {
                    delete_req: false,
                    status_t1: true,
                    status_t2: false
                }
            }).then(countPending => {
                resolve(countPending);
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'user_pending_po',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getNew_psr = (req, res, next) => {
        winston.info({
            level: 'info',
            label: 'user',
            message: 'get_new_psr'
        })
        return new Promise((resolve, reject) => {
            return models.psr.count({
                // attributes: [
                //     [sequelize.fn('count', sequelize.col('psr_no')), 'new_count_psr']
                // ],
                where: {
                    delete_req: false,
                    status_t1: false,
                    status_t2: false
                }
            }).then(countPending => {
                resolve(countPending);
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'user_new_psr',
                    message: err
                })
                reject(err);
            })
        })
    }

    const getPending_psr = (req, res, next) => {
        winston.info({
            level: 'info',
            label: 'user',
            message: 'get_pending_psr'
        })
        return new Promise((resolve, reject) => {
            return models.psr.count({
                // attributes: [
                //     [sequelize.fn('count', sequelize.col('psr_no')), 'pending_count_psr']
                // ],
                where: {
                    delete_req: false,
                    status_t1: true,
                    status_t2: false
                }
            }).then(countPending => {
                resolve(countPending);
            }).catch(err => {
                winston.error({
                    level: 'error',
                    label: 'user_pending_psr',
                    message: err
                })
                reject(err);
            })
        })
    }

    if (req.user.t1) {
        if (req.app.settings.env === 'development') {
            winston.debug({
                level: 'debug',
                label: 'user',
                message: 'user_t1'
            })
        }
        res.status(200).send({
            status: "t1"
        });
    } else if (req.user.t2) {
        if (req.app.settings.env === 'development') {
            winston.debug({
                level: 'debug',
                label: 'user',
                message: 'user_t2'
            })
        }
        Promise.all([getNew_po(), getNew_psr()])
            .then(count => {
                res.status(200).send({
                    status: "t2",
                    count
                });
            }).catch(err => {
                if (req.app.settings.env === 'development') {
                    winston.debug({
                        level: 'debug',
                        label: 'user_t2',
                        message: err
                    })
                }
                res.status(500).send(err);
            })
    } else if (req.user.t3) {
        if (req.app.settings.env === 'development') {
            winston.debug({
                level: 'debug',
                label: 'user',
                message: 'user_t3'
            })
        }
        Promise.all([getNew_po(), getPending_po(), getNew_psr(), getPending_psr()])
            .then(count => {
                res.status(200).send({
                    status: "t3",
                    count
                });
            }).catch(err => {
                if (req.app.settings.env === 'development') {
                    winston.debug({
                        level: 'debug',
                        label: 'user_t3',
                        message: err
                    })
                }
                res.status(500).send(err);
            })
    } else {
        if (req.app.settings.env === 'development') {
            winston.debug({
                level: 'debug',
                label: 'user_update_permission',
                message: err
            })
        }
        res.status(200).send({
            status: "Please update permissions"
        })
    }
}

//search
exports.search = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'user',
        message: 'search'
    })

    return models.Users.findAll({
        attributes: ['id', 'username', 'firstname', 'lastname'],
        where: {
            username: {
                [op.like]: '%' + req.body.username.toLowerCase() + '%'
            }
        }
    }).then(users => {
        res.status(200).send(users);
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'user_search',
            message: err
        })
        res.status(500).send(err);
    })
}