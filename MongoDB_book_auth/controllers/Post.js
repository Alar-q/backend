const PostModel = require('../models/Post');
const UserModel = require('../models/User');

exports.post = (req, res) => {
	res.render('post');
};

exports.create_form = (req, res) => {
	res.render('create_post');
};

exports.create = async (req, res)=>{
	// console.log(req.body);
	// let user = await UserModel.findById(req.session.userId)
	// await console.log(user);
	await PostModel.create({
		...req.body,
		// username: user.username,
		userId: req.session.userId,
	});

	res.redirect('/');
}

exports.all = async (req, res) => {
	// let user = await UserModel.findById(userId);
	let posts = await PostModel.find({}).populate('userId');
	// await console.log(posts);
	await res.render('posts', {posts});
};

exports.protect = (req, res, next) => {
	UserModel.findById(req.session.userId, (err, user)=>{
		if(err || !user){
			return res.redirect('/');
		}
		next();
	});
};