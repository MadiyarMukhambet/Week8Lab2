const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  publicationYear: Number,
  quantityAvailable: { type: Number, default: 0 },
  price: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
