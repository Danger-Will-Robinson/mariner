const router = require('express').Router();
const passport = require('passport');
const keys = require('../config/keys');
var axios = require('axios')
var youtube = require('../youtubelogic/youtube')
const User = require('../models/user-model');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));
// auth with youtube
router.get('/youtube',
    passport.authenticate('youtube')
);
router.get('/twitter',
    passport.authenticate('twitter')
);
router.get('/twitter/callback',
        passport.authenticate('twitter'),
        (req, res) => {
            console.log(req.user)
            res.render('twitter', { user: req.user, status: req.user._json.status })
        }
    )
    // send back all of the
router.get('/youtube/callback', passport.authenticate('youtube'), async(req, res) => {
    let userComplete = req.user
    let userData = await youtube.gimmeAll(req.user._id, keys.youTube.API_KEY)
    let commentCountByVideoID = {}
    userData.comments.forEach(comment => {
        if (commentCountByVideoID[comment.videoId]) {
            commentCountByVideoID[comment.videoId]++
        } else {
            commentCountByVideoID[comment.videoId] = 1
        }
    })
    userData.videos.forEach(video => {
        if (commentCountByVideoID[video.videoId]) {
            video.commentCount = commentCountByVideoID[video.videoId]
        }
    })
    let wordCount = {}
    userData.comments.forEach(c => {
        c.comment.split(' ').forEach(word => {
            word = word.replace(/\./g, '').replace(/\!/, '').replace(/\,/, '').replace(/\?/, '').replace(/\(/, '').replace(/\)/, '').replace(/\$/, '').replace(/\!/, '').replace(/\#/, '').replace(/\+/, '')
            if (!wordCount[word]) {
                wordCount[word] = 1
            } else {
                wordCount[word]++
            }
        })
    })


    // console.log(userData.videos, '******')
    // userData.commentCountByVideoID = commentCountByVideoID
    User.findOneAndUpdate({ _id: req.user._id }, { $set: { videos: userData.videos, comments: userData.comments, commentCountByVideoID: commentCountByVideoID, wordCount: wordCount } }, { upsert: true, returnNewDocument: true, fields: 'data' }, function(err, data) {
        if (err) {
            console.error(err.message, 'err in update db')
        }
    })
    res.userData = req.user;



    axios.post('http://localhost:5001/comments', {
            videos: userData.videos,
            user: req.user,
            comments: userData.comments,
            commentCountByVideoID: commentCountByVideoID
        })
        .then((response) => {
            console.log('success posting to CR ')
        })
        .catch((err) => {
            console.error('err in axios post ', err.message);
        })
        // res.render('youtubeVideos', { data:
    res.redirect(`http://localhost:5000/${req.user.name}/${req.user._id}`);


});

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.render('profile', { user: req.user });
});


module.exports = router;