const router = require('express').Router();
const passport = require('passport');

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
router.get('/youtube/callback',
    passport.authenticate('youtube', {
        successRedirect: '/profile/youtube',
        failureRedirect: '/'
    }));



// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.render('profile', { user: req.user });
});


module.exports = router;