exports.login_form = (req, res) => {
	res.render('auth/login_form');
};

exports.register_form = (req, res) => {
	res.render('auth/register_form');
};

exports.patch_form = (req, res) => {
	res.render('auth/patch_form');
};

exports.delete_form = (req, res) => {
	res.render('auth/delete_form.ejs');
};

exports.logout = (req, res) => {
	req.logout(()=>{});
	res.redirect('/');
};

const UserModel = require('../models/User');

//post delete
exports.delete = async (req, res) => {
	let name = req.body.username;
	if(req.user.username === name)
		await UserModel.findOneAndDelete({username: name});
	res.redirect('/auth/logout');
}

//patch
exports.patch = async (req, res) => {
	if(req.body.old_username === req.user.username || req.body.new_username !== '') {
		req.user.username = req.body.new_username;
		await UserModel.findOneAndUpdate({username: req.body.old_username}, {username: req.body.new_username});
	}
	res.redirect('/');
}

exports.userAccount = (req, res)=>{
	const user = {
		username: req.user.username,
		email: req.user.email,
	}
	res.render('auth/userAccount', {user});
}