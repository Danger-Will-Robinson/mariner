var express = require('express');
var router = express.Router();
const http = require('http');
const axios = require('axios');
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('test get happening');
  axios.get('http://localhost:5000/API/getRaw')
  .then((response) => {
  	console.log('response.data is ', response.data);
  })
  .catch((err) => {
  	console.log('err in axios comment get ', err);
  })
});

module.exports = router;
