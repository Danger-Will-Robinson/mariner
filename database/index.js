const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'thesisdb.ceerpjusbx3v.us-east-2.rds.amazonaws.com',
  user: 'BigWidowsPeak',
  password: 'hackreactor03',
  database: 'ThesisDB'
});

connection.connect((err, success) => {
  if (err) {
    console.log('err in db connect', err);
  } else {
    console.log('successful connection');
  }
});

module.exports = connection;