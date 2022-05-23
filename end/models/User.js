const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		unique: true,
	},
	password: String,
	authType: String,
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;