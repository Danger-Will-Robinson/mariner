const passport = require('passport');
const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));
// auth with youtube
router.get('/youtube', passport.authenticate('youtube', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

module.exports = router;