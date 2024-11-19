const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // For serving static files
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerceDB');

// Schema and Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  imageUrl: String,
});

const Product = mongoose.model('Product', productSchema);

// Root route: Redirect to products page
app.get('/', (req, res) => {
  res.redirect('/products');
});

// Render the form
app.get('/add-product', (req, res) => {
  res.render('productForm');
});

// Handle form submission
app.post('/products', async (req, res) => {
  const { name, price, description, category, imageUrl } = req.body;

  try {
    const newProduct = new Product({ name, price, description, category, imageUrl });
    await newProduct.save();
    res.send('Product added successfully!');
  } catch (error) {
    res.status(500).send('Error adding product: ' + error.message);
  }
});

// Display all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('productList', { products });
  } catch (error) {
    res.status(500).send('Error fetching products: ' + error.message);
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
