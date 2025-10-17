// index.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'supersecurekey123'; // You can replace this with an env variable

app.use(bodyParser.json());

// Dummy user (for login)
const user = {
  username: 'bankuser',
  password: 'securepass'
};

// In-memory account data
let account = {
  balance: 1000
};

// JWT middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: 'Access token missing' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Protected routes
app.get('/balance', authenticateToken, (req, res) => {
  res.json({ balance: account.balance });
});

app.post('/deposit', authenticateToken, (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) return res.status(400).json({ message: 'Invalid deposit amount' });

  account.balance += amount;
  res.json({ message: 'Deposit successful', balance: account.balance });
});

app.post('/withdraw', authenticateToken, (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) return res.status(400).json({ message: 'Invalid withdrawal amount' });

  if (account.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }

  account.balance -= amount;
  res.json({ message: 'Withdrawal successful', balance: account.balance });
});

app.listen(PORT, () => {
  console.log(`Banking API server running at http://localhost:${PORT}`);
});
