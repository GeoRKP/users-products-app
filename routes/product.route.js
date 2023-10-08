const express = require('express');
const productController = require('../controllers/product.controller');
const router = express.Router();

router.get('/', productController.findAllProducts);
router.get('/:productId', productController.findProductById);
router.post('/', productController.createProduct);
router.patch('/', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
