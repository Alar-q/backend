const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
	image: {
		type: String, 
		required: true,
		unique: true,
	},
	title: {
		type: String, 
		required: true,
		unique: true,
	},	
	body: {
		type: String, 
		required: true,
	},
	// userId: {
	// 	type: String,
	// 	required: true,
	// },
});

const Product = new mongoose.model('Product', ProductSchema);

module.exports = Product;