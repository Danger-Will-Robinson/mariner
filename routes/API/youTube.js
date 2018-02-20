var express = require('express');
var router = express.Router();
const DATA = require('./sampleData');
/* GET home page. */
router.get('/getCommenterImages', function(req, res, next) {
    console.log('target hit');
    //   res.render('', { title: 'Express' });
    const images = DATA.items.map(comment => {
        comment.snippet.authorChannelUrl
    })
    res.json(images)
});
router.get('/getComments', (req, res, next) => {
    const comments = DATA.items.map(comment =>
        comment.snippet.textDisplay)
    res.json(comments)
})

module.exports = router;