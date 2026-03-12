const express = require('express');
const controller = require('../controllers/productController');

const router = express.Router();

router.post('/products', controller.createProduct);
router.get('/products', controller.getProducts);
router.get('/products/search', controller.searchByName);
router.get('/products/category', controller.filterByCategory);
router.get('/products/:id', controller.getProductById);
router.put('/products/:id', controller.updateProduct);
router.delete('/products/:id', controller.deleteProduct);

module.exports = router;
