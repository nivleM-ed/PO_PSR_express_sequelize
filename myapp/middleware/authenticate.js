let createError = require('http-errors');

exports.isLoggedIn = function(req, res, next) {
    if(req.user)
        next();
    else
        next(res.send({auth_error: "notLoggedIn"}));
}



exports.auth_no_t1 = function(req, res, next) {
    if(req.user && req.user.t1 != true) 
        next();
    else
        next(res.send({auth_error: "noPermission"}));
}


exports.auth_not_t1_t2 = function(req, res, next) {
    if(req.user && req.user.t1 != true && req.user.user.t2 != true) 
        next();
    else
        next(res.send({auth_error: "noPermission"}));
}

exports.auth_admin = function(req, res, next) {
    if(req.user && req.user.is_admin == true) 
        next();
    else
        next(res.send({auth_error: "noAdminPermission"}));
}