const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	username: {
		type: String, 
		unique: true,
		default: ''
	},
	email: {
		type: String, 
		required: true,
		unique: true
	},
	
	password: {
		type: String, 
		required: true,
		default: ''
	},	
});

const User = new mongoose.model('User', schema);

module.exports = User;