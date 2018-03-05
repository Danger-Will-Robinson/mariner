const mongoose = require('mongoose');
const keys = require('../server/config/keys');
const mongoUri = keys.mongoDb.dbUri
const db = mongoose.connect(mongoUri, (err, success) => {
    if (err) {
        console.log('err in mongodb connect', err);
    } else {
        console.log('success in mongodb ');
    }
});

module.exports = db;