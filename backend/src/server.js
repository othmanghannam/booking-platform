const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Import des routes
const authRoutes = require('./routes/authRoutes');

// Connexion à MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Déclaration des routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('API khddama mzyan!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur khddam f port: ${PORT}`);
});