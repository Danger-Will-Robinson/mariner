const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../../../database/index')

router.post('/', (req, res) => {
  console.log('receving post from Login ')
  //console.log('receving post from Login req.body looks like ', req.body);
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

  req.body[0].videos.map((video, index) => {
    let urlId = video.snippet.thumbnails.default.url.split('vi/')[1].split('/')[0]
    db.query(`insert into videos (title, thumbnailURL, user, urlId) values ('${video.snippet.title}', '${video.snippet.thumbnails.default.url}', '${req.body[0].name}', '${urlId}')`, (err, result) => {
      if (err) {
        console.log(`err at index ${index}, err looks like ${err}`)
      } else {
        console.log('posted to db');
      }
    })   
  })
  res.status(500).send()
  res.end()
  
})

router.get('/', (req, res) => {
  //axios.get('http://localhost:3000/api/sample')
  axios.get('https://getmyyoutubedata.herokuapp.com/api/sample')
  .then((response) => {
    console.log('response.data from Login ', response.data[0].videos)
    // let url = response.data[0].videos[0].snippet.thumbnails.default.url
    // let urlId = url.split('vi/')[1].split('/')[0]
    // console.log('url is ', url)
    // console.log('urlId is ', urlId)
    // axios.post('http://localhost:5001/comments', 
    //   response.data[0])
    // .then((res) => {
    //   console.log('response in post from router.get is ')
    // })
    // .catch((err) => {
    //   console.log('err in post from router.get is ')
    // })
  })
  .catch((err) => {
    console.log('err in get to Login ');
  })


})

module.exports = router