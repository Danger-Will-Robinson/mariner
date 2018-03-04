const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', (req, res) => {
  // req.body.videos.map((video) => {
  //   db.query(//insert videos and corresponding comments into mysql db
  //   (err, response) => {
  //     if (err) {
  //       console.log('err in db post')
  //     } else {
  //       console.log('response ', response)
  //     }
  //   }),
  // })
  // res.status(err.status || 500);
  // res.end()
  console.log('receving post from Login req.body looks like ', req.body);
})

router.get('/', (req, res) => {
  axios.get('http://localhost:3000/api/sample')
  .then((response) => {
    console.log('response.data from Login ', response.data[0].videos)
  })
  .catch((err) => {
    console.log('err in get to Login ', err);
  })
})

module.exports = router