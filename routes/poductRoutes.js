const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
router.post('/products', auth, createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', auth, updateProduct);
router.delete('/products/:id', auth, deleteProduct);
module.exports = router;