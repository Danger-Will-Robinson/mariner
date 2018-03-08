const mongoose = require('mongoose');
const db = require('./index.js');

const preferenceSchema = new mongoose.Schema({
  frequency: Number,
  preferences: String,
})

const Preferences = mongoose.model('preferences', preferenceSchema);

module.exports = Preferences;