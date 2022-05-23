const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
	title: {
		type: String, 
		required: true,
	},	
	body: {
		type: String, 
		required: true,
	},
	// username: {
	// 	type: String,
	// 	required: true,
	// },
	userId:{
		type:mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	date:{
		type: Date,
		default: new Date(),
	},
});

const Post = new mongoose.model('Post', PostSchema);

module.exports = Post;