const mysql = require('mysql');
const keys = require('../../../config/keys')

const connection = mysql.createConnection({
  host: 'thesisdb.ceerpjusbx3v.us-east-2.rds.amazonaws.com',
  user: keys.workBench.user,
  password: keys.workBench.password
});

connection.connect((err, success) => {
  if (err) {
    console.log('err in db connect', err);
  } else {
    console.log('successful connection');
  }
});

module.exports = connection;