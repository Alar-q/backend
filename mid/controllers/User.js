const UserModel = require('../models/User');

exports.create = async (req, res) => {
	if(!req.body.email || !req.body.username || !req.body.password){
		res.status(400).send({message: "Content can not be empty"});
	}
	
	await UserModel.create(req.body, (err, user)=>{
		console.log(err, user);
	});

	res.redirect('/');
};

exports.find = async (req, res) => {
	try{
		await UserModel.findOne(req.query, (err, users) => {
			// const user = users.length == 0 ?  : users;
			// if(users.length == 0)
				// res.status(200).json({message, users});
  			// else 
  			if(users == undefined)
  				res.redirect('/notfound');
			else res.render('auth/userAccount', {users});

		});
	}catch(err){console.log(err);}
};

exports.update = async (req, res) => {
	// console.log("update", req.body);
	// res.json(req.body);
	await UserModel.findOneAndUpdate(
		{ username: req.body.username, password: req.body.old_password },
		{ username: req.body.username,password: req.body.new_password }
	);
	res.redirect('/');
};

exports.destroy = async (req, res) => {
	// console.log("destroy", req.body);
	await UserModel.findOneAndDelete(req.body);
	// res.json(req.body);
	res.redirect('/');
};

