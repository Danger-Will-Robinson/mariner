const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../db/index.js');

router.post('/', function (req, res) {
  console.log('App message recieved');

  // Extract 'query' from request.body
  const query = req.body.query;
  console.log('query is ', query);

  // Use this string to execute query on DB.
  db.query('use ThesisDB');
  db.query(query, function (error, result) {
    if (error) {
      console.error(error);
      res.status(error.status || 500);
      res.end();
    } else {
      res.status(200);
      //console.log(result);
      res.json(result);
    }
  });
  
  // Return DB results in response.
});

module.exports = router;