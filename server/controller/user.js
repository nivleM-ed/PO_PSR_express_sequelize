let models = require('../models');
let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
const { isEmpty } = require('lodash');
const { validateUser } = require('../validators/signup');
var sequelize = require('sequelize');

const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

//login
exports.login = function(req, res, next) {
    passport.authenticate('local', {session:true}, function(err, user, info) {
        if (err) {
            res.send(err); 
        } else if(!user) {
            res.send(info);
        } else {
            req.logIn(user, function(err) {
                if(err) {return res.send(err)}
                console.log("Session send:")
                console.log(req.session)
                return res.send(user);
            })
        }
      })(req, res, next);
}


//logout
exports.logout = function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.status(200).send({logout:"logout"});
}


//get counts
exports.getCounts = function(req, res, next) {
    const getNew_po = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                attributes : [[sequelize.fn('count', sequelize.col('po_no')), 'new_count_po']],
                where : {
                    delete_req : false,
                    status_t1 : false,
                    status_t2 : false
                }
            }).then(countPending => {
                resolve(countPending);
            }).catch(err => {
                reject(err);
            })
        })
    }

    const getPending_po = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.purchase_order.findAll({
                attributes : [[sequelize.fn('count', sequelize.col('po_no')), 'pending_count_po']],
                where : {
                    delete_req : false,
                    status_t1 : true,
                    status_t2 : false
                }
            }).then(countPending => {
                resolve(countPending);
            }).catch(err => {
                reject(err);
            })
        })
    }

    const getNew_psr = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.findAll({
                attributes : [[sequelize.fn('count', sequelize.col('psr_no')), 'new_count_psr']],
                where : {
                    delete_req : false,
                    status_t1 : false,
                    status_t2 : false
                }
            }).then(countPending => {
                resolve(countPending);
            }).catch(err => {
                reject(err);
            })
        })
    }

    const getPending_psr = (req, res, next) => {
        return new Promise((resolve, reject) => {
            return models.psr.findAll({
                attributes : [[sequelize.fn('count', sequelize.col('psr_no')), 'pending_count_psr']],
                where : {
                    delete_req : false,
                    status_t1 : true,
                    status_t2 : false
                }
            }).then(countPending => {
                resolve(countPending);
            }).catch(err => {
                reject(err);
            })
        })
    }

    if(req.user.t1) {
        res.status(200).send({status:"t1"});
    } else if(req.user.t2) {
        Promise.all([getNew_po(), getNew_psr()]) 
            .then(count => {
                res.status(200).send({status:"t2", count});
            }).catch(err => {
                res.status(500).send(err);
            })
    } else if(req.user.t3){
        Promise.all([getNew_po(), getPending_po(), getNew_psr(), getPending_psr()])
        .then(count => {
            res.status(200).send({status:"t3", count});
        }).catch(err => {
            res.status(500).send(err);
        })
    } else {
        res.status(200).send({status:"Please update permissions"})
    }
}