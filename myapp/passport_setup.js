//for user authentication
let LocalStrategy = require('passport-local').Strategy;

let bcrypt = require('bcrypt');
let models = require('./models');

const validPassword = function(user, password) {
	return bcrypt.compareSync(password, user.password);
}

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		return done(null, user.id)
	});

	passport.deserializeUser(function(id, done) {
		console.log("deserialize");
		models.admin.findOne({
			where: {
				'id' : id
			}
		}).then(user => {
			if (user == null) {
				console.log("User is null");
				return done(new Error('Wrong user.id'))
			}
			console.log("Deserialized works");
			return done(null, user);
		})
	});

	passport.use(new LocalStrategy({
		usernameField: 'username', 
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done) {
		return models.admin.findOne({
			where: {
				'username' : username
			},
		}).then(user => {
			if (user == null) {
				console.log("user is null");
				return done(null, false, { error: 'noUserExist'})
			} else if (user.password == null || user.password == undefined) {
				console.log("password is null");
				return done(null, false, { error: 'pwdProblem'})
			} else if(!validPassword(user, password)) {
				console.log("password is wrong");
				return done(null, false, { error: 'incorrectPwdUsername' })
			} else if(user.is_admin == false) {
				return done(null, false, {error: 'noPermission'});
			}
			return done(null, user);
		}).catch(err => {
			done(err, false);
		})
	}))
}