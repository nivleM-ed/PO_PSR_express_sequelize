let models = require('../models');
let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
const { isEmpty } = require('lodash');
const { validateUser } = require('../validators/signup');

const generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

//login
exports.login = function(req, res, next) {
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


//logout
exports.logout = function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.status(200).send({logout:"logout"});
}