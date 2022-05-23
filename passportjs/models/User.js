const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	username: {
		type: String, 
		unique: true,
	},
	email: {
		type: String,
		unique: true,
	},
	password: String,
	authType: String,
});

// const bcrypt = require('bcrypt');
// UserSchema.pre('save', function(next){
// 	const user = this
// 	bcrypt.hash(user.password, 10, (err, hash)=>{
// 		user.password = hash;
// 		if(err)
// 			console.log(err);
// 		next();
// 	});
// });

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;