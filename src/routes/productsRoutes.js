const express = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

// Ruta para listar todos los productos
productsRouter.get('/', (req, res) => {
    const limit = req.query.limit; // Obtener el parámetro de consulta limit, si está presente
    const products = productsController.getAllProducts(limit);
    res.json(products);
});

// Ruta para obtener un producto por su ID
productsRouter.get('/:pid', (req, res) => {
    const productId = req.params.pid;
    const product = productsController.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

productsRouter.post('/', (req, res) => {
    const { title, description, code, price } = req.body;
    const id = Math.random().toString(36).substr(2, 9); // Generating random id
    const newProduct = { id, title, description, code, price };
    productsController.addProduct(newProduct);
    res.status(201).json({ message: 'Product added successfully' });
});

productsRouter.put('/:pid', (req, res) => {
    const productId = req.params.pid;
    const updatedProduct = req.body;
    const success = productsController.updateProduct(productId, updatedProduct);
    if (success) {
        res.json({ message: 'Product updated successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

productsRouter.delete('/:pid', (req, res) => {
    const productId = req.params.pid;
    const success = productsController.deleteProduct(productId);
    if (success) {
        res.json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = productsRouter;
