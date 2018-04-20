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
    console.log(Object.keys(req.user.name), )
    res.render('youtubeVideos', { user: req.user, comments: req.user._doc.comments, data: req.user._doc.videos });
});

router.get('/videos', authCheck, (req, res) => {
    let r = { data: req.user.videos, user: req.user.name, thing: req.user.commentCountByVideoId }
    res.render('videos', r)
})
router.get('/video/:id', authCheck, (req, res) => {
    console.log(req.query, req.params, "BWQ") //, req._doc.name)
    let r = { data: req.user.videos.slice(req.params.id, req.params.id + 9), user: req.user.name, thing: req.user.commentCountByVideoId }
    res.render('videos', r)
})
router.get('/comment/:id', authCheck, (req, res) => {
    console.log(req.query, req.params, "BWQ") //, req._doc.name)
    let r = { comments: req.user.comments.slice(req.params.id, req.params.id + 9), user: req.user.name, thing: req.user.commentCountByVideoId }
    res.render('comments', r)
})
router.get('/comments', authCheck, (req, res) => {
    res.render('comments', { user: req.user.name, comments: req.user.comments })
})


router.get('/youtube', function(req, res) {

    res.json({
        status: "ok",
        data: req.user
    });

});



module.exports = router;