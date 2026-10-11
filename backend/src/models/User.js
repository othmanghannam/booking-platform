const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom est obligatoire'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Le mot de passe est obligatoire'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['client', 'provider', 'admin'],
      default: 'client',
    },
    phone: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

module.exports = mongoose.model('User', userSchema);