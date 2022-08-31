//dynamically load list of items
require('dotenv').config() 

const connectDB = require('./db/connect');
const Product = require('./models/products');

const jsonProducts = require('./products.json')


const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI)
		await Product.deleteMany(); //Remove later but good for cleaning datta
		await Product.create(jsonProducts);

		console.log('Success')
		process.exit(0)
	}catch (error){
		console.log(error)
		process.exit(1)
	}
}

start()