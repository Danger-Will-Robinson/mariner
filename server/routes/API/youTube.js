var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const DATA = require('../../../data/sampleData');
const VIDEO = require('../../../data/videoResponse');
const ALLVIDEOS = require('../../../data/youTubeAllVideoResponse');
const db = require('../../../database/index')

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }));

router.get('/getAllVideoPlayLists', function(req, res, next) {
    var ids = ALLVIDEOS.map(obj => {
        console.log(obj.snippet)
        return {
            title: obj.snippet.title,
            id: obj.id,
            thumbUrls: obj.snippet.thumbnails
        }
    })
    res.json(ids)
})

router.post('/videodatabase/addUser/', function(req, res, next) {
    db.query(`INSERT INTO users (username, google_auth) VALUES ('${req.body.username}', '${req.body.auth}')`, function cb(err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
        }
    }); 
    res.status(err.status || 500);
    res.end(); 
});

router.get('/videodatabase/users', function(req, res, next) {
    db.query('SELECT * FROM users', function cb(err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.post('/videodatabase/addVideo', function(req, res, next) {
    // let {title, thumbnail, } = req.body;
    let query = `INSERT INTO videos (title, thumbnailURL, commentCount, viewCount, user) VALUES (${req.body.title},${req.body.thumbnail},${req.body.commentCount},${req.body.viewCount},${req.body.user})`;
    db.query(query, function cb(err, result) {
        if (err) {
            console.error(err);
            res.end();
        } else {
            console.log(result);
            res.json(result);
        }
    });
});

router.get('/getCommenterImages', function(req, res, next) {
    console.log('target hit');
    //   res.render('', { title: 'Express' });
    const images = DATA.items.map(comment =>
        comment.snippet.authorChannelUrl
    )
    res.json(images)
});

router.get('/getComments', (req, res, next) => {
    const comments = DATA.items.map(comment =>
        comment.snippet.textDisplay)
    res.json(comments)
});

router.get('/getCommenterNames', (req, res, next) => {
    const names = DATA.items.map(comment =>
            comment.snippet.authorDisplayName)
        //should be reaching to youtube, have a promise on return then r
        //send youtube data out to SA API
        //send back to client
    res.json(names)
})

router.get('/getTotalLikes', (req, res, next) => {
    const likes = DATA.items.reduce((acc, comment) =>
        acc += comment.snippet.likeCount, 0)
    res.json(likes)
})

router.get('/getUserVideoTitles', (req, res, next) => {
    // use this for actual call:
    // GET https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&maxResults=50&mine=true&key={YOUR_API_KEY}
    const titles = DATA.items.map(comment =>
        comment.snippet.authorDisplayName)
    res.json(titles)

})

module.exports = router;