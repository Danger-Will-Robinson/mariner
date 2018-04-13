const express = require('express');
const router = express.Router();
const db = require('../db/index');
const axios = require('axios');
const queue = require('queue');


const q = queue();

router.post('/', (req, res) => {
  db.query('use ThesisDB');
  req.body.comments.forEach((comment, index) => {
    q.push(() => {
      return new Promise((resolve, reject) => {
        db.query(`UPDATE comments SET replied = 1 where idcomments = ${comment.idcomments}`, (err, res) => {
          if (err) {
            console.log('err in dbupdate replied ', err);
            reject();
          } else {
            console.log('udated replied in db at index ', index)
            resolve();
          }
        })     
      })
      .then((response) => {
        console.log('replied promise complete')
      })
      .catch((err) => {
        console.log('err in replied')
      })
    })
    q.start((err) => {
      if (err) throw err
      console.log('all done updated replied coloumn')
      console.log('comment is ', comment);

    })
  })
})


module.exports = router
