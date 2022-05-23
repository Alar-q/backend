const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide Username'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide Password'],
	},
});

schema.pre('save', function(next){
	const user = this;
	bcrypt.hash(user.password, 10, (err, hash)=>{
		console.log('password saved', err, hash);
		user.password = hash;
		next();
	});
});

schema.plugin(require('mongoose-unique-validator'), {message: 'Username already exist'})

const User = new mongoose.model('User', schema);

module.exports = User;