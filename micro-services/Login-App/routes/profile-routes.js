const router = require('express').Router();
const keys = require('../config/keys');
const google = require('googleapis')
const OAuth2 = google.google.auth.OAuth2

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    console.log('in gooogle user is', req.user)
    res.render('profile', { user: req.user });
});




// authCheck
router.get('/youtube', function(req, res) {

    res.json({
        status: "ok",
        data: req.user
    });

});



module.exports = router;