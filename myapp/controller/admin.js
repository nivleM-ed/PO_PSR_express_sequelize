let models = require('../models');
let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
const { isEmpty } = require('lodash');
const { validateUser } = require('../validators/signup');

const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

//get all the users for main page
exports.get_all_user = function(req, res, next) {
    return models.User.findAll({

    }).then(users => {
        res.status(200).send({users: users});
    }).catch(err => {
        res.status(500).send("Error -> ", + err);
    })
}

//NOT FOR FINAL PRODUCT
//add new admin into database
exports.add_admin = function(req, res, next) {
	let errors = {};
	return validateUser(errors, req).then(errors => {
		if (!isEmpty(errors)) {
            res.send(errors);
		} else {
            newUser = models.User.build({
            username: req.body.username,
            password: generateHash(req.body.password),
            is_admin: true
            });	
            return newUser.save().then(result => {
                res.status(200).send();
            }).catch(err => {
                res.status(500).send("Error -> " + err);
            })	
		}
	})
}

//add new user into database
exports.add_user = function(req, res, next) {
	let errors = {};
	return validateUser(errors, req).then(errors => {
		if (!isEmpty(errors)) {
            res.send(errors);
		} else {
            newUser = models.User.build({
            username: req.body.username,
            password: generateHash(req.body.password),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            });	
            return newUser.save().then(result => {
                res.status(200).send();
            }).catch(err => {
                res.status(500).send("Error -> " + err);
            })	
		}
	})
}


//login for admin
exports.admin_login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            res.send(err); 
        } else if(!user) {
            res.send(info);
        } else {
            req.logIn(user, function(err) {
                if(err) {return res.send(err)}
                return res.send(user);
            })
        }
      })(req, res, next);
}


//logout for admin
exports.admin_logout = function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.status(200).send({logout:"logout"});
}


//delete user
exports.del_user = function(req, res, next) {
    return models.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send("Error -> ", + err);
    })
}


//update the tier of user 
exports.update_tier = function(req, res, next) {
    return models.User.update({
        t1: req.body.t1,
        t2: req.body.t2,
        t3: req.body.t3
    },{
        where: {
            id: req.params.id
        }    
    }).then(result => {
        res.status(200).send();
    }).catch(err => {
        res.status(500).send("Error -> ", + err);
    })
}