let models = require('../models');
let validator = require('validator');

const validateCreateUserFields = function(errors, req) {
	if (!validator.isAscii(req.body.password)) {
		errors["password"] = "Invalid characters in password, please try another one.";		
	}
	if (!validator.isLength(req.body.password, {min: 6, max: 25})) {
		errors["password"] = "Please ensure that your password has a minimum of 8 characters";
	}
}

exports.validateUser = function(errors, req) {
	return new Promise(function(resolve, reject) {
		validateCreateUserFields(errors, req);
		return models.Users.findOne({
			where: {
				username: req.body.username
			}
		}).then(u => {
			if (u !== null) {
				errors["username"] = "Username is already in use.";
			}
			resolve(errors);
		})
	})
}