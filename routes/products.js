const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const productsFilePath = path.join(__dirname, '../products.json');

// Helper function to read products from the JSON file
const readProductsFromFile = () => {
  const data = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write products to the JSON file
const writeProductsToFile = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

// GET all products
router.get('/', (req, res) => {
  const products = readProductsFromFile();
  res.json(products); // Return all products
});

// GET a specific product by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const products = readProductsFromFile();
  const product = products.league.find(p => p.id === id);
  if (product) {
    res.json(product); // Return the specific product
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// POST (create) a new product
router.post('/', (req, res) => {
  const products = readProductsFromFile();
  const newProduct = req.body;
  newProduct.id = products.length + 1; // Assign new ID
  products.push(newProduct);
  writeProductsToFile(products); // Write the updated product list to file
  res.status(201).json(newProduct); // Return the newly created product
});

// PUT (update) a product by ID
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const products = readProductsFromFile();
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex !== -1) {
    const updatedProduct = { ...products[productIndex], ...req.body };
    products[productIndex] = updatedProduct;
    writeProductsToFile(products); // Write the updated product list to file
    res.json(updatedProduct); // Return the updated product
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE a product by ID
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let products = readProductsFromFile();
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex !== -1) {
    products = products.filter(p => p.id !== id);
    writeProductsToFile(products); // Write the updated product list to file
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

module.exports = router;
