const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	email: {
		type: String, 
		required: true,
		unique: true
	},
	firstname: {
		type: String, 
		default: ''
	},
	lastname: {
		type: String, 
		default: ''
	},	
	phone: String,
});

const User = new mongoose.model('User', schema);

module.exports = User;