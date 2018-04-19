const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    _id: { type: String },
    access_token: String,
    refresh_token: String,
    name: String,
    data: [],
    videos: {},
    comments: {},
    commentCountByVideoID: {}
}, { collection: "you-tube-logins" });

const User = mongoose.model('user', userSchema)

module.exports = User;