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
                message: 'noCookie'
            })
            res.send({
                err: "noCookie"
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

exports.reset_password = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'user',
        message: 'reset_password'
    })

    if (req.params.user_id == req.user.id) {
        return models.Users.findOne({
            where: {
                id: req.user.id
            }
        }).then(user2 => {
            if(bcrypt.compareSync(req.body.userObj._in_param_1, user2.password)) {
                if (req.body.userObj._in_param_2 == req.body.userObj._in_param_3) {
                    return models.Users.update({
                        password: generateHash(req.body.userObj._in_param_2)
                    }, {
                        where: {
                            id: req.user.id
                        }
                    }).then(user => {
                        res.status(200).send(user);
                    }).catch(err => {
                        winston.error({
                            level: 'error',
                            label: 'reset_password',
                            message: err
                        });
                        res.status(500).send(err);
                    });
                } else {
                    res.send({err: "repeat wrong password"});
                }
            } else {
                res.send({err: "password wrong"})
            }
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'reset_password_validate',
                message: err
            });
            res.status(500).send(err);
        })
    }
}