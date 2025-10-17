 // backend/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

const products = [
  { name: 'Laptop', price: 999.99 },
  { name: 'Mouse', price: 19.99 },
  { name: 'Keyboard', price: 49.99 },
  { name: 'Monitor', price: 199.99 }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
