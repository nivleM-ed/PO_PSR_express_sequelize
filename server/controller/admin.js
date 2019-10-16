let models = require('../models');
let bcrypt = require('bcrypt');
let loggerDebug = require('../logs/loggerDebug.js');
let loggerInfo = require('../logs/loggerInfo.js');
let loggerError = require('../logs/loggerError.js');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
const {
    isEmpty
} = require('lodash');
const {
    validateUser
} = require('../validators/signup');

const generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

//get all the users for main page
exports.get_all_user = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'Admin',
        message: 'get_all_user'
    })
    return models.Users.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(users => {
        res.status(200).send({
            users: users
        });
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'Admin_get_all_user',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.get_user = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'Admin',
        message: 'get_user'
    })
    return models.Users.findOne({
        where: {
            id: req.params.user_id
        }
    }).then(users => {
        res.status(200).send({
            users: users
        });
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'Admin_get_user',
            message: err
        })
        res.status(500).send(err);
    })
}

//NOT FOR FINAL PRODUCT
//add new admin into database
//default: admin, password
exports.add_admin = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'Admin',
        message: 'add_admin'
    })
    let errors = {};
    return validateUser(errors, req).then(errors => {
        if (!isEmpty(errors)) {
            res.send(errors);
        } else {
            newUser = models.Users.build({
                username: req.body.username,
                password: generateHash(req.body.password),
                is_admin: true,
            });
            return newUser.save().then(result => {
                res.status(200).send();
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'Admin_add_admin',
                    message: err
                })
                res.status(500).send(err);
            })
        }
    })
}

//add new user into database
exports.add_user = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'Admin',
        message: 'add_user'
    })
    let errors = {};
    return validateUser(errors, req).then(errors => {
        if (!isEmpty(errors)) {
            res.send(errors);
        } else {
            newUser = models.Users.build({
                username: req.body.username,
                password: generateHash(req.body.password),
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                t1: req.body.t1,
                t2: req.body.t2,
                t3: req.body.t3
            });
            return newUser.save().then(result => {
                res.status(200).send();
            }).catch(err => {
                loggerError.log({
                    level: 'error',
                    label: 'Admin_add_user',
                    message: err
                })
                res.status(500).send(err);
            })
        }
    })
}


//delete user
exports.del_user = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'Admin',
        message: 'del_user'
    })
    return models.Users.destroy({
        where: {
            id: req.params.user_id
        }
    }).then(result => {
        res.status(200).send();
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'Admin_del_user',
            message: err
        })
        res.status(500).send(err);
    })
}


//update the tier of user 
exports.update_tier = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'Admin',
        message: 'update_tier'
    })
    return models.Users.update({
        t1: req.body.t1,
        t2: req.body.t2,
        t3: req.body.t3
    }, {
        where: {
            id: req.params.user_id
        }
    }).then(result => {
        res.status(200).send();
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'Admin_update_tier',
            message: err
        })
        res.status(500).send(err);
    })
}