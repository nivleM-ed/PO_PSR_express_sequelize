let models = require('../models');
let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
const { isEmpty } = require('lodash');
const { validateUser } = require('../validators/signup');

const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

exports.test = function(req, res, next) {
    let myTest = {};
    res.send({msg: myTest});
}

exports.signup = function(req, res, next) {
	let errors = {};
	return validateUser(errors, req).then(errors => {
		if (!isEmpty(errors)) {
            res.send(errors);
		} else {
            newUser = models.User.build({
            username: req.body.email,
            password: generateHash(req.body.password),
            });	
            return newUser.save().then(result => {
                passport.authenticate('local', function(req, res){
                    res.status(200).send(req.user);
                });
            })	
				
		}
	})
}

exports.login = function(req, res, next) {
    passport.authenticate('local', function(req, res) {
        res.status(200).send(req.user);
    });
}

exports.logout = function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.status(200).send();
}