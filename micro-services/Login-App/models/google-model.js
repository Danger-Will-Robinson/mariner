const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    youTubeId: String,
    thumbnail: String
}, { collection: "google-logins" });


const User = mongoose.model('guser', userSchema)
module.exports = User;