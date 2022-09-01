const Product = require('../models/products')

const getAllProductsStatic = async (req, res) => {
	const products = await Product.find({})


	//throw new Error('testing async errors')
	res.status(200).json({products})
}

const getAllProducts = async (req, res) => {
	res.status(200).json({msg: 'products route'})
}


const getAllProductsFeatured = async (req, res) => {
	//hardcoded filter do-not use
	const products = await Product.find({featured:true})
	res.status(200).json({products , no:products.length})
}
module.exports = {
	getAllProducts,
	getAllProductsStatic,
	getAllProductsFeatured
}