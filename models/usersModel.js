var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')

var usersSchema = new Schema({
	'username': String,
	'password': String,
});

usersSchema.pre('save', function (next) {
	var user = this;
	bcrypt.hash(user.password, 10, function (err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash
		next();
	})
});
usersSchema.statics.authenticate = function (username, password, callback) {
	console.log("username : ", username);
	User.findOne({ username: username })
		.exec(function (err, user) {
			if (err) {
				return callback(err)
			} else if (!user) {
				var err = new Error("User not found!");
				err.status = 401;
				return callback(err);
			}
			console.log("user Je bil najden");
			bcrypt.compare(password, user.password, function (err, result) {
				if (result == true) {
					return callback(null, user);
				} else {
					return callback();
				}
			})
		});
}

var User = mongoose.model('user', usersSchema);
module.exports = User;


