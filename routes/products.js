const express = require('express')
const router = express.Router()

const{getAllProducts, getAllProductsStatic, getAllProductsFeatured} = require('../controllers/products')

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)
router.route('/featured').get(getAllProductsFeatured)

module.exports = router