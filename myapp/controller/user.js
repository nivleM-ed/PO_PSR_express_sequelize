let models = require('../models');
let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_user')(passport);
const { isEmpty } = require('lodash');
const { validateUser } = require('../validators/signup');

const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

exports.login = function(req, res, next) {
    passport.authenticate('local', function(req, res) {
        res.status(200).send(req.user);
    }).catch(err => {
        res.status(500).send("Error -> " + err);
    })	
}

exports.logout = function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.status(200).send();
}