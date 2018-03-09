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
// send back all of the
router.get('/youtube/callback', passport.authenticate('youtube'), async(req, res) => {
    let userComplete = req.user
    let userData = await youtube.gimmeAll(req.user._id, keys.youTube.API_KEY)
        // userData.user = req.user

    User.findOneAndUpdate({ _id: req.user._id }, { videos: userData.videos, comments: userData.comments }, { fields: 'data' }, function(err) {
        if (err) {
            console.log(err, 'err in update db')
        }
    })
    res.userData = req.user;
    // res.json(req.user)
    // res.json(userData)

    // http.post('http://localhost:5001/comments', {
    //   videos: userData.videos,
    //   user: req.user,
    //   comments: userData.comments
    // })
    axios.post('http://localhost:5001/comments', {
            videos: userData.videos,
            user: req.user,
            comments: userData.comments
        })
        .then((response) => {
            console.log('success: response is ')
        })
        .catch((err) => {
            console.log('err in axios post ');
        })
    res.redirect(`http://localhost:5000/${req.user.name}/${req.user._id}`)

    // res.render('youtubeVideos', { data:

});

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.render('profile', { user: req.user });
});


module.exports = router;