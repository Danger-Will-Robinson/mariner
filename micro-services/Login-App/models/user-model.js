const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     username: String,
//     googleId: String,
//     youTubeId: String,
//     thumbnail: String
// });

// const User = mongoose.model('user', userSchema);
var userSchema = new mongoose.Schema({
    _id: { type: String },
    access_token: String,
    refresh_token: String,
    name: String,
    data: [],
    videos: {},
    comments: {}
}, { collection: "you-tube-logins" });

// var User = mongoose.model('User', userSchema);
const User = mongoose.model('user', userSchema)
module.exports = User;