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
}))

// auth with youtube
router.get('/youtube',
    passport.authenticate('youtube')
)

// auth with twittew
router.get('/twitter',
    passport.authenticate('twitter')
)

//route twitter api rediects to
router.get('/twitter/callback',
    passport.authenticate('twitter'),
    (req, res) => {
        res.render('twitter', { user: req.user, status: req.user._json.status })
    }
)

// route that youtub api redirects to
router.get('/youtube/callback',
    passport.authenticate('youtube'),

    async(req, res) => {

        let userComplete = req.user

        youtube.gimmeAll(req.user._id, keys.youTube.API_KEY).then(rawData => {
            console.log(Object.keys(rawData), 'REERER')
            let userData = formatData(rawData)

            User.findOneAndUpdate({ _id: req.user._id }, { $set: { videos: userData.videos, comments: userData.comments, commentCountByVideoID: userData.commentCountByVideoID, wordCount: userData.wordCount } }, { upsert: true, returnNewDocument: true, fields: 'data' }, function(err, data) {
                if (err) {
                    console.error(err.message, 'err in update db')
                }
            })


            moveData(req.user, userData, userData.commentCountByVideoID)

            res.redirect(`http://localhost:5000/${req.user.name}/${req.user._id}`);

        }).catch(err => {
            console.error(err.message)
        })
    }
)

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.render('profile', { user: req.user });
})

var moveData = async(user, userData, commentCountByVideoID) => {

    axios.post('http://localhost:5001/comments', {
            videos: userData.videos,
            user: user,
            comments: userData.comments
        })
        .then((response) => {
            console.log('success posting to CR ')
        })
        .catch((err) => {
            console.error('err in axios post to CR ', err.message);
        })


}
var formatData = (userData) => {

    userData.commentCountByVideoID = userData.comments.reduce((cc, inc) => {
        cc[inc] ? cc[inc]++ : cc[inc] = 1
        return cc
    })

    userData.videos.forEach(video => {
        if (userData.commentCountByVideoID[video.videoId]) {
            video.commentCount = userData.commentCountByVideoID[video.videoId]
        }
    })

    userData.wordCount = userData.videos.reduce((wc, inc) => {
        wc[inc] ? wc[inc]++ : wc[inc] = 1
        return wc
    })
    return userData
}



module.exports = router;