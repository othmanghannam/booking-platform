const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Le titre du service est obligatoire'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La description est obligatoire'],
    },
    duration: {
      type: Number, // Durée en minutes (ex: 30, 60)
      required: [true, 'La durée est obligatoire'],
    },
    price: {
      type: Number,
      required: [true, 'Le prix est obligatoire'],
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Service', serviceSchema);