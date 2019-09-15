let models = require('../models');
var sequelize = require('sequelize');


exports.show_all_leave = function(req, res, next) {
    return models.leave.findAll({
        order: [['createdAt', 'DESC']]
    }).then(results => {
        res.status(200).send({leave: results});
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}


exports.show_own_leave = function(req, res, next) {
    return models.leave.findAll({
        order: [['createdAt', 'DESC']]
    },{
        where: {
            user_id: req.params.id,
        }
    }).then(results => {
        res.status(200).send({leave: results});
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

exports.add_leave = function(req, res, next) {
    return models.leave.create({
        user_id: req.params.user_id,
        date_from: req.body.date_from,
        date_to: req.body.date_to,
        reason: req.body.reason
    }).then(created => {
        res.status(201).send()
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

exports.del_leave = function(req, res, next) {
    return model.leave.destroy({
        where: {
            id: req.params.leave_id
        }
    }).then(deleted => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })
}

exports.approve_leave = function(req, res, next) {
    return model.leave.update({
        status: true
    },{
        where: {
            id: req.params.leave_id
        }
    }).then(updated => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send("error -> " + err);
    })
}

exports.upd_leave = function(req, res, next) {
    return model.leave.update({
        date_from: req.body.date_from,
        date_to: req.body.date_to,
        reason: req.body.reason
    },{
        where: {
            id: req.params.leave_id
        }
    }).then(updated => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send("error -> " + err);
    })
}
