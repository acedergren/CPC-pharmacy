const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(bodyParser.json());

// Load product catalog from JSON file
const productsFile = path.join(__dirname, '..', 'public', 'data', 'products.json');
let allProducts = [];
try {
  const raw = fs.readFileSync(productsFile, 'utf-8');
  allProducts = JSON.parse(raw);
  console.log(`📦 Loaded ${allProducts.length} products from JSON`);
} catch (err) {
  console.error('❌ Could not read products.json:', err);
}

// Product catalog endpoint (multilingual)
app.get('/api/products', (req, res) => {
  console.log('🔍 GET /api/products called');
  res.json(allProducts);
});

// Checkout API
app.post('/api/checkout', (req, res) => {
  console.log('🚀 Checkout:', req.body);
  res.json({ success: true });
});

// Serve static assets from public/
app.use(express.static(path.join(__dirname, '..', 'public')));

// Start server
app.listen(PORT, () =>
  console.log(`Demo Pharmacy Store running at http://localhost:${PORT}`)
);