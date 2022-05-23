const ProductModel = require('../models/Product');
const UserModel = require('../models/User');

exports.post_create = async (req, res) => {
	const image = req.files.image;

	if(!image.name || !req.body.title || !req.body.username || !req.body.body){
		res.status(400).send({message: "Content can not be empty"});
	}

 	UserModel.findOne({
		username: req.body.username
	}, (err, user) => {
		if(user != null && err == null){
			const imageName = req.body.username + new Date().getTime().toString() + image.name;

			const product = new ProductModel({
				image: imageName,
				username: req.body.username,
				title: req.body.title,
				body: req.body.body,
			});

			// Нужно как нибудь сделать название каждого изображения уникальным.
			product.save()
				.then((product) => {
					console.log('The product', product.title, 'created');
					image.mv('./public/img/' + imageName);
				}).catch((err) => {
					console.log('Something went wrong.', err);
					res.send({message: "Content can not be empty"});
				});

			res.redirect('/product/create');
		}else {
			console.log("User not founded");
			res.send({message: "User not founded"});
		}
	})

};

exports.get_create = async (req, res)=>{
	res.render('product/create');
};

exports.get_all = async (req, res)=>{
	ProductModel.find({}, (err, products)=>{
		console.log(err, products);
		res.render('product/viewall', {products});
	});
};

exports.get_one = async (req, res)=>{
	ProductModel.find({
		username: req.params.username
	}, (err, products)=>{
		console.log(err, products);
		res.render('product/viewall', {products});
	});
};