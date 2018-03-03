const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.body.videos.map((video) => {
    db.query(//insert videos and corresponding comments into mysql db
    (err, response) => {
      if (err) {
        console.log('err in db post')
      } else {
        console.log('response ', response)
      }
    }),
  })
  res.status(err.status || 500);
  res.end()
})

