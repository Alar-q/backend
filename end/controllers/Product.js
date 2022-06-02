/**
 * CRUD Status:
 *      res.status(200) // Ok
 *      res.status(201) // Created
 *      res.status(204) // No content
 *      res.status(400) // Bad request
 *      res.status(401) // Unauthorized
 *      res.status(403) // Forbidden
 *      res.status(404) // Not found
 *      res.status(500) // Server error
 * */

const ProductModel = require('../models/Product');
// const UserModel = require('../models/User');


exports.create_form = async (req, res)=>{
	res.status(200).render('product/create_form');
};
exports.delete_form = (req, res) => {
	res.status(200).render('product/delete_form');
}
exports.patch_form = (req, res) => {
	res.status(200).render('product/patch_form');
}


exports.create = async (req, res) => {
	const image = req.files.image;

	if(!image.name || !req.body.title || !req.body.body)
		res.status(400).json({message: "Content can not be empty"});

	const imageName = new Date().getTime().toString() + image.name;

	ProductModel.create({
		image: imageName,
		title: req.body.title,
		body: req.body.body,
	}, (err, created) => {
			// console.log('The product', product.title, 'created');
			image.mv('./public/img/' + imageName);
			if(created)
				res.status(201).json({created});
			else
				res.status(500).json({message: 'something went wrong'})
		})
};

exports.get = (req, res)=>{
	const ob = {};
	if(req.params.title)
		ob.title = req.params.title;

	ProductModel.find(ob, (err, products)=>{
		if(products)
			res.status(200).json({products})
		else
			res.status(204).json({message: 'something went wrong'})
	});
};


exports.delete = (req, res) => {
	ProductModel.findOneAndRemove({title: req.body.title}, (err, removed)=>{
		if(removed){
			res.status(200).json({removed});
		}else{
			res.status(204).json({message: 'something went wrong'});
		}
	});
};


exports.patch = (req, res) => {
	ProductModel.findOneAndUpdate(
		{
			title: req.body.title
		},
		{
			title: req.body.new_title,
			body: req.body.body
		},
		{
			new: true
		},
		(err, newOne) => {
			if(!err && newOne){
				res.status(200).json({updated: newOne});
			}else{
				res.status(204).json({message: 'something went wrong'});
			}
	});
};


exports.show_all = (req, res)=>{
	// const ob = {};
	// if(req.params.title)
		// ob.title = req.params.title;

	ProductModel.find({}, (err, products)=>{
		if(products)
			res.status(200).render('product/view_products', {products});
		else
			res.status(204).json({message: 'something went wrong'})
	});
};