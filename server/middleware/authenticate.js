let loggerDebug = require('../logs/loggerDebug.js');
let loggerInfo = require('../logs/loggerInfo.js');
let loggerError = require('../logs/loggerError.js');
let createError = require('http-errors');

exports.isLoggedIn = function (req, res, next) {
    loggerDebug.log({
        level: 'debug',
        label: 'Login Session',
        message: req.session
    });
    loggerInfo.log({
        level: 'info',
        label: 'Authenticate',
        message: 'LoggedIn'
    })

    try {
        if (req.user)
            next();
        else {
            loggerInfo.log({
                level: 'info',
                label: 'Authenticate_logged_in',
                message: 'notLoggedIn'
            })
            res.send({
                error: "notLoggedIn"
            });
        }
    } catch (error) {
        loggerError.log({
            level: 'error',
            label: 'Authenticate_logged_in',
            message: error
        })
        res.send({
            error: "systemErr"
        })
    }
}

exports.auth_no_t1 = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'Authenticate',
        message: 'auth_no_t1'
    })
    try {
        if (req.user && req.user.t1 != true)
            next();
        else {
            loggerInfo.log({
                level: 'info',
                label: 'Authenticate_auth_no_t1',
                message: 'noPermission'
            })
            res.send({
                error: "noPermission"
            });
        }
    } catch (error) {
        loggerError.log({
            level: 'error',
            label: 'Authenticate_auth_no_t1',
            message: error
        })
        res.send({
            error: "systemErr"
        })
    }
}

exports.auth_no_t1_t2 = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'Authenticate',
        message: 'auth_no_t1_t2'
    })
    try {
        if (req.user && req.user.t1 != true && req.user.user.t2 != true)
            next();
        else {
            loggerInfo.log({
                level: 'info',
                label: 'Authenticate_auth_no_t1_t2',
                message: 'noPermission'
            })
            res.send({
                error: "noPermission"
            });
        }
    } catch (error) {
        loggerError.log({
            level: 'error',
            label: 'Authenticate_auth_no_t1_t2',
            message: error
        })
        res.send({
            error: "systemErr"
        })
    }
}

exports.auth_admin = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'Authenticate',
        message: 'admin'
    })
    try {
        if (req.user && req.user.is_admin == true)
            next();
        else {
            loggerInfo.log({
                level: 'error',
                label: 'Authenticate_auth_admin',
                message: 'noPermission'
            })
            res.send({
                error: "noPermission"
            });
        }
    } catch (error) {
        loggerError.log({
            level: 'error',
            label: 'Authenticate_auth_admin',
            message: error
        })
        res.send({
            error: "systemErr"
        })
    }

}