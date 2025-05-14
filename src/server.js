const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());

app.post('/api/checkout', (req, res) => {
  console.log('🚀 Checkout data received:', req.body);
  return res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`🛒 Demo store running: http://localhost:${PORT}`);
});
