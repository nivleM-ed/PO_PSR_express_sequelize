let models = require('../models');
var sequelize = require('sequelize');
let loggerDebug = require('../logs/loggerDebug.js');
let loggerInfo = require('../logs/loggerInfo.js');
let loggerError = require('../logs/loggerError.js');


exports.show_all_leave = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'leave',
        message: 'show_all_leave'
    })
    return models.leave.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(leave => {
        res.status(200).send(leave);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'leave_show_all_leave',
            message: err
        })
        res.status(500).send("Error -> " + err);
    })
}


exports.show_own_leave = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'leave',
        message: 'show_own_leave'
    })
    return models.leave.findAll({
        order: [
            ['createdAt', 'DESC']
        ]
    }, {
        where: {
            user_id: req.user.id,
        }
    }).then(leave => {
        res.status(200).send(leave);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'leave_show_own_leave',
            message: err
        })
        res.status(500).send("Error -> " + err);
    })
}

exports.report = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'leave',
        message: 'report'
    })
    return models.leave.findOne({
        where: {
            user_id: req.user.id,
            id: req.params.leave_id
        }
    }).then(leave => {
        res.status(200).send(leave);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'leave_report',
            message: err
        })
        res.status(500).send("Error -> " + err);
    })
}

exports.add_leave = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'leave',
        message: 'leave_add_leave'
    })
    return models.leave.create({
        user_id: req.user.id,
        date_from: req.body.date_from,
        date_to: req.body.date_to,
        reason: req.body.reason
    }).then(leave => {
        res.status(201).send(leave)
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'leave_add_leave',
            message: err
        })
        res.status(500).send("Error -> " + err);
    })
}

exports.del_leave = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'leave',
        message: 'del_leave'
    })
    return models.leave.destroy({
        where: {
            id: req.params.leave_id
        }
    }).then(deleted => {
        res.status(200).send("deleted");
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'leave_del_leave',
            message: err
        })
        res.status(500).send("Error -> " + err);
    })
}

exports.approve_leave = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'leave',
        message: 'approve_leave'
    })
    return models.leave.update({
        status: true
    }, {
        where: {
            id: req.params.leave_id
        }
    }).then(leave => {
        res.status(200).send(leave);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'leave_approve_leave',
            message: err
        })
        res.status(500).send("error -> " + err);
    })
}

exports.upd_leave = function (req, res, next) {
    loggerInfo.log({
        level: 'info',
        label: 'leave',
        message: 'upd_leave'
    })
    return models.leave.update({
        date_from: req.body.date_from,
        date_to: req.body.date_to,
        reason: req.body.reason
    }, {
        where: {
            id: req.params.leave_id
        }
    }).then(leave => {
        res.status(200).send(leave);
    }).catch(err => {
        loggerError.log({
            level: 'error',
            label: 'leave_upd_leave',
            message: err
        })
        res.status(500).send("error -> " + err);
    })
}