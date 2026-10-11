const mongoose = require('mongoose');
const dns = require('dns');

// Forcer la résolution DNS via Google Public DNS
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connecté avec succès : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erreur de connexion MongoDB : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;