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
const {
    dbJoin
} = require('../dbJoin');
var winston = require('../logs/winston');

const generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

function password_generator( len ) {
    var length = (len)?(len):(10);
    var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
    var numeric = '0123456789';
    var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    var password = "";
    var character = "";
    var crunch = true;
    while( password.length<length ) {
        entity1 = Math.ceil(string.length * Math.random()*Math.random());
        entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
        entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
        hold = string.charAt( entity1 );
        hold = (password.length%2==0)?(hold.toUpperCase()):(hold);
        character += hold;
        character += numeric.charAt( entity2 );
        character += punctuation.charAt( entity3 );
        password = character;
    }
    password=password.split('').sort(function(){return 0.5-Math.random()}).join('');
    return password.substr(0,len);
}

//get all the users for main page
exports.get_all_user = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Admin',
        message: 'get_all_user'
    })
    return models.Users.findAll({
        attributes: ['username', 'firstname', 'lastname'],
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(user => {
        res.status(200).send(user)
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'Admin_get_all_user',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.get_user = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Admin',
        message: 'get_user'
    })
    return models.Users.findOne({
        where: {
            id: req.params.user_id
        }
    }).then(users => {
        res.status(200).send(users)
    }).catch(err => {
        winston.error({
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
    winston.info({
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
                winston.error({
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
    winston.info({
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
                t3: req.body.t3,
                t4: req.body.t4
            });
            return newUser.save().then(result => {
                res.status(200).send();
            }).catch(err => {
                winston.error({
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
    winston.info({
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
        winston.error({
            level: 'error',
            label: 'Admin_del_user',
            message: err
        })
        res.status(500).send(err);
    })
}


//update the tier of user 
exports.update_tier = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Admin',
        message: 'update_tier'
    })
    return models.Users.update({
        t1: req.body.t1,
        t2: req.body.t2,
        t3: req.body.t3,
        t4: req.body.t4
    }, {
        where: {
            id: req.params.user_id
        }
    }).then(result => {
        res.status(200).send();
    }).catch(err => {
        winston.error({
            level: 'error',
            label: 'Admin_update_tier',
            message: err
        })
        res.status(500).send(err);
    })
}

exports.random_password = function (req, res, next) {
    winston.info({
        level: 'info',
        label: 'Admin',
        message: 'random_password'
    })
    const rndpass = password_generator();

    if(req.user.is_admin) {
        return models.Users.update({
            password: generateHash(rndpass)
        }, {
            where: {
                id: req.params.user_id
            } 
        }).then(user => {
            res.status(200).send({new_pwd: rndpass});
        }).catch(err => {
            winston.error({
                level: 'error',
                label: 'reset_password',
                message: err
            });
            res.status(500).send(err);
        });
    }
}