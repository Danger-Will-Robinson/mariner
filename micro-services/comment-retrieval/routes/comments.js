const express = require('express');
const router = express.Router();
const axios = require('axios');
const db = require('../db/index')
const bodyParser = require('body-parser');
const queue = require('queue');
const videoQ = queue();
const commentQ = queue();


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
        console.log('err posting user name ', err); 
        console.log('req body looks like: ', req.body);
      } else {
        console.log('posted name to db');
      }
    }) 
  
  
  req.body.videos.forEach((video, index) => {
    console.log('inside video loop')
    console.log('video looks like video ', video.thumbnails)
    videoQ.push(() => {
      return new Promise((resolve, reject) => {
        db.query(`insert into videos (title, thumbnailURL, lowRes, user, contentId, chanId) values ('${video.title.replace(/'/g, "''")}', '${video.thumbnails.maxres.url}', '${video.thumbnails.default.url}', (select idusers from users where username ='${req.body.user.name}'), '${video.videoId}', '${video.channelId}')`, (err, result) => {
          if (err) {
            console.log(`err at index ${index}, err looks like ${err}`)
            reject();
          } else {
            console.log(`posted video to db at index ${index}`);
            resolve();
          }
        })   
      })
      .then((response) => {
        console.log('ready for json');
      })
      .catch((err) => {
        console.log('err in req.body.videos loop ', err);
      })      
    })
    
  })
  videoQ.start((err) =>{
    if (err) throw err
    console.log('all done with videos');
  })
  
  req.body.comments.forEach((comment, index) => {
    console.log('inside comment loop')
    commentQ.push(() => {
      return new Promise((resolve, reject) => {
        console.log('comment in loop is ', comment.videoId)
        let bools = identifyQuestion(comment.comment);
        db.query(`insert into comments (comment, author, timestamp, thumbnail, likeCount, providedId, hasQuestion, video) values ('${comment.comment}', '${comment.author}', '${comment.publishedAt}', '${comment.authorThumbnail}', '${comment.likeCount}', '${comment.commentId}', '${bools}', (select idvideos from videos where contentId ='${comment.videoId}'))`, (err, result) => {
          if (err) {
            //console.log('err in comment db query', err);
            reject();
          } else {
            //console.log('posted comment to db at index ', index);
            resolve();
          }
        })
      })
      .then((response) => {
        console.log('ready for comment json');
      })
      .catch((err) => {
        console.log('err in comment loop');
      })  
    })
  })
  commentQ.start((err) => {
    if (err) throw err
    console.log('all done with comments');
  })
})
  
  
 

router.get('/', (req, res) => {
  console.log('get request happening in comments app router.get')
  //axios.get('http://localhost:3000/api/sample')
  axios.get('https://getmyyoutubedata.herokuapp.com/api/sample')
  .then((response) => {
    console.log('response in get ')
    axios.post('http://localhost:5001/replied', {
      videos: response.data[0].videos,
      user: response.data[0].name,
      comments: response.data[0].comments
    })
    .then((res) => {
      console.log('response in post from router.get is ')
    })
    .catch((err) => {
      console.log('err in post from router.get is ')     
    })
  })
  .catch((err) => {
    console.log('err in get to Login ', err);
  })


})

module.exports = router
module.exports.identifyQuestion = identifyQuestion

