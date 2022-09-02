const Product = require('../models/products')

const getAllProductsStatic = async (req, res) => {
	const search = 'ab'

	const products = await Product.find({price:{$gt:30}
		
	}).select('name price').limit(4)


	//throw new Error('testing async errors')
	res.status(200).json({products , no:products.length})
	
}

const getAllProducts = async (req, res) => {
	const{featured, company, name, sort, fields, numericFilters} = req.query //new object with filter choices
	const queryObject = {}

	//FILTER

	if(featured){
		queryObject.featured = featured === 'true' ? true : false
	}
	if(company){
		queryObject.company = company


	}if(name){
		queryObject.name = {$regex:name, $options:'i'}
		
	}if(numericFilters){
		const operatorMap = {
			'>':'$gt',
			'>=':'$gte',
			'=':'$eq',
			'>=':'$gte',
			'<':'$lte',
			'<=':'$lte',
			
		}
		const regEx = /\b(<|>|>=|=|<|<=)\b/g;
		let filters = numericFilters.replace(regEx,(match) => `-${operatorMap[match]}-`);
		

		const options = ['price', 'rating'];
		filters = filters.split(',').forEach((item) => {
			const [field, operator, value] = item.split('-')
			if(options.includes(field)){

				queryObject[field] = {[operator]: Number(value)}
			}

		})
	}
	//console.log(queryObject)

	//FILTER

	let result =  Product.find(queryObject)
	if(sort){
		//products = products.sort()
		const sortList = sort.split(',').join(' ')
		result = result.sort(sortList)
		console.log(sort)
	}else{
		result = result.sort('createdAt') //incase no sort value hardcode default value
	}

	//ATTRIBUTES 
	if(fields){
		//products = products.sort()
		const fieldList = fields.split(',').join(' ')
		result = result.select(fieldList)
		console.log(fields)
	}

	//NUMBER FILTERS
	
	console.log(queryObject)
	

	//LIMITS & SKIPS
	const page = Number(req.query.page) || 1
	const limit = Number(req.query.limit) || 10
	const skip = (page-1)*limit;

	result = result.skip(skip).limit(limit)

	//NUMBERIC FILTERS 

	//23 products 7 per page with 4 pages 
	const products = await result 



	res.status(200).json({products , no:products.length})
}

/*
const getAllProductsFeatured = async (req, res) => {
	//hardcoded filter do-not use
	const{featured} = req.query
	const queryObject = {}

	if(featured){
		queryObject.featured = featured === 'true' ? true : false
	}
	console.log(queryObject)

	const products = await Product.find(queryObject)
	res.status(200).json({products , no:products.length})
}*/
module.exports = {
	getAllProducts,
	getAllProductsStatic,
	//getAllProductsFeatured
}