const mysql = require('mysql');
const keys = require ('../../../config/keys');


const connection = mysql.createConnection({
  host: 'thesisdb.ceerpjusbx3v.us-east-2.rds.amazonaws.com',
  user: keys.twitterWorkBench.user,
  password: keys.twitterWorkBench.password,
  database: keys.twitterWorkBench.database
});

connection.connect((err, success) => {
  if (err) {
    console.log('err in db connect', err);
  } else {
    console.log('successful connection');
  }
});

module.exports = connection;