const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('./index.js');

const preferenceSchema = new mongoose.Schema({
  frequency: Number,
  preferences: String,
  lastLogIn: {
    type: Date,
    default: Date.now
  }
})

const Preferences = mongoose.model('preferences', preferenceSchema);

module.exports = Preferences;