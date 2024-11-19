const express = require('express');
const Product = require('./models/Product'); // Import the model
const router = express.Router();

// Route to display all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products
    res.render('productList', { products }); // Render the EJS template
  } catch (error) {
    res.status(500).send('Error fetching products: ' + error.message);
  }
});

// Export the router (if in a separate file)
module.exports = router;
