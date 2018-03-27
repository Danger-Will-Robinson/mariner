const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    twitterId: String,
    thumbnail: String
}, { collection: "twitter-logins" });


const User = mongoose.model('tuser', userSchema)
module.exports = User;