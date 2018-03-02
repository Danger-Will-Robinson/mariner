const router = require('express').Router();
const passport = require('passport');
const keys = require('../config/keys');
var axios = require('axios')
var youtube = require('../youtubelogic/youtube')

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
    var userID = req.user;
    var w = await youtube.runner(userID, keys.youTube.API_KEY)
    res.json(w.data.items)
});

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.render('profile', { user: req.user });
});


module.exports = router;