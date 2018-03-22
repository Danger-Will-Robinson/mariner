const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../db/index')
const bodyParser = require('body-parser');



let identifyQuestion = (text) => {
  let containsQuestion = ((text.substr(0, text.length - 1) === '?') || (text.includes('?') === true));
  containsQuestion === true ? containsQuestion = 'T' : containsQuestion = 'F';
  return containsQuestion;  
}

router.post('/', (req, res) => {
  console.log('receiving post from Login ')
  //console.log('receving post from Login req.body looks like ', req.body);
  
  db.query('use ThesisDB');
  db.query(`insert into users (userName) values ('${req.body.user.name}')`, (err, res) => {
    if (err) {
      console.log('err posting user name ', err)
    } else {
      console.log('posted name to db');
      res.json();
    }
  }) 
  req.body.videos.forEach((video, index) => {
    console.log('inside map')
    //db.query(`(SELECT REPLACE('${video.snippet.title}', ''', '''')),`)

    db.query(`insert into videos (title, thumbnailURL, user, contentId) values ('${video.snippet.title.replace(/'/g, "''")}', '${video.snippet.thumbnails.default.url}', (select idusers from users where username ='${req.body.user.name}'), '${video.contentDetails.videoId}')`, (err, result) => {
      if (err) {
        console.log(`err at index ${index}, err looks like ${err}`)
      } else {
        console.log('posted to db');
      }
    })   
  })

  req.body.comments.forEach((comment, index) => {
    let bools = identifyQuestion(comment.comment);
    console.log('bools is ', bools)
    db.query(`insert into comments (comment, author, timestamp, thumbnail, likeCount, providedId, hasQuestion, video) values ('${comment.comment}', '${comment.author}', '${comment.publishedAt}', '${comment.authorThumbnail}', '${comment.likeCount}', '${comment.commentId}', '${bools}', (select idvideos from videos where contentId ='${comment.videoId}'))`, (err, result) => {
      if (err) {
        console.log(`err in comment post at index ${index}, err looks like ${err}`)
      } else {
        console.log('posted comment to db');
      }
    })  
  })

   res.status(200).send()
   res.end()
  
})

router.get('/', (req, res) => {
  console.log('get request happening in comments app router.get')
  axios.get('http://localhost:3000/api/sample')
  //axios.get('https://getmyyoutubedata.herokuapp.com/api/sample')
  .then((response) => {
    axios.post('http://localhost:5001/comments', response.data[0])
    .then((res) => {
      console.log('response in post from router.get is ')
    })
    .catch((err) => {
      console.log('err in post from router.get is ')
      
    })
  })
  .catch((err) => {
    console.log('err in get to Login ');
  })


})

module.exports = router
module.exports.identifyQuestion = identifyQuestion

