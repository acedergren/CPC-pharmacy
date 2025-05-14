const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static assets from public/
app.use(express.static(path.join(__dirname, '..', 'public')));
// Parse JSON bodies
app.use(bodyParser.json());

// Checkout API
app.post('/api/checkout', (req, res) => {
  console.log('🚀 Checkout:', req.body);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Demo store running at http://localhost:${PORT}`));