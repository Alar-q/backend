const UserModel = require('../models/User');

exports.create = async (req, res) => {
	if(!req.body.email || !req.body.firstname || !req.body.lastname || !req.body.phone){
		res.status(400).send({message: "Content can not be empty"});
	}

	const user = new UserModel(req.body);

	await user.save()
		.then((data)=>{
			res.send({
				message: "User created successfully!", 
				user: data
			});
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occured while creating user"
			});
		});
};

exports.create2 = async (req, res) => {
	if(!req.body.email || !req.body.firstname || !req.body.lastname || !req.body.phone){
		res.status(400).send({message: "Content can not be empty"});
	}

	await UserModel.create(req.body, (err, user)=>{
		console.log(err, user);
	});

	res.redirect('/');
};

exports.findAll = async (req, res) => {
	try{
		UserModel.find({}, (err, users) => {
			console.log(err, users);
			res.status(200).json(users);
		});
	}catch(err){console.log(err);}
};