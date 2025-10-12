const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(express.json());

// Replace this with your actual MongoDB URI
mongoose.connect('mongodb+srv://sksachinkumar4616_db_user:7HKF7Cu2ghm74X6p@cluster0.ojdpjzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.use('/api', studentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
