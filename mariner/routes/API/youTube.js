var express = require('express');
var router = express.Router();
const DATA = require('./sampleData');
/* GET home page. */
router.get('/getVideos', function(req, res, next) {
    console.log('target hit');
    //   res.render('', { title: 'Express' });
});
router.get('/getComments', (req, res, next) => {
    console.log('comments hit', DATA.items.length);
    const comments = DATA.items.map(comment =>
        comment.snippet.textDisplay)
    res.json(comments)
    console.log(comments)
})

module.exports = router;