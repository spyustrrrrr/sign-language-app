// backend/models/Sign.js
const mongoose = require('mongoose');

const signSchema = new mongoose.Schema({
  character: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  type: {
    type: String,
    enum: ['alphabet', 'number', 'word'],
    default: 'alphabet'
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    required: true
  },
  mediaUrl: {
    type: String,
    required: true
  },
  mediaPublicId: {
    type: String, // untuk keperluan delete nanti
  },
  description: {
    type: String,
    default: ''
  },
  example: {
    type: String, // contoh penggunaan
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sign', signSchema);