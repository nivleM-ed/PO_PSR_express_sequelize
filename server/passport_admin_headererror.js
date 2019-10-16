//for authentication
let LocalStrategy = require('passport-local').Strategy;

let bcrypt = require('bcrypt');
let models = require('./models');

const validPassword = function(user, password) {
	return bcrypt.compareSync(password, user.password);
}

module.exports = function(passport) {
	console.log("Strategy Called Admin");
	passport.serializeUser(function(user, done) {
		console.log("Serialized");
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
		console.log("Deserialized");
		models.admin.findOne({
			where: {
				'id' : id
			}
		}).then(user => {
			if (user == null) {
				models.Users.findOne({
					where: {
						'id': id
					}
				}).then(user => {
					if (user == null) {
						done(new Error('Wrong user id'))
					}
					console.log("deserialize admin");
					done(null, user);
				})
			}
			console.log("deserialize user");
			return done(null, user);
		})
	});


	passport.use(new LocalStrategy({
		usernameField: 'username', 
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done) {
		return models.Users.findOne({
			where: {
				'username' : username
			},
		}).then(user => {
			if (user == null) {
				return models.admin.findOne({
					where: {
						'username' : username
					}
				}).then(user => {
					if(user == null) {
						return done(null, false, { message: 'User does not exist.'})
					} else if (user.password == null || user.password == undefined) {
						return done(null, false, { message: 'Something is wrong with your password.'})
					} else if(!validPassword(user, password)) {
						return done(null, false, {message: 'Incorrect username or password'})
					}
					console.log("Admin Log In");
					return done(null, user);
				})
			} else if (user.password == null || user.password == undefined) {
				return done(null, false, { message: 'Something is wrong with your password. Please contact admin.'})
			} else if(!validPassword(user, password)) {
				return done(null, false, { message: 'Incorrect username or password' })
			}
			console.log("User Log In");
			return done(null, user);
		}).catch(err => {
			return done(err, false);
		})
	}))
}