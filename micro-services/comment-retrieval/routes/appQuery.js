const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../db/index.js');

router.post('/', function (req, res) {
  console.log('App message recieved');
  console.log(req.body);
  // Extract 'query' from request.body
  // Use this string to execute query on DB.
  // Return DB results in response.
  res.end();
});

module.exports = router;