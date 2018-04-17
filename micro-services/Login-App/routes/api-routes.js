const router = require('express').Router();
const keys = require('../config/keys');
const bodyParser = require('body-parser');
const User = require('../models/user-model');
var youtube = require('../youtubeLogic/youtube')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/user/tokens/:id', (req, res) => {
    let userId = req.params.id;
    console.log('user info is', userId)
})

router.post('/comments/by-name/', function(req, res) {
    if (req.query.name || req.body.name) {
        User.find({ name: req.query.name || req.body.name }, function(err, data) {
            if (err) {
                console.log(err)
            }
            res.json(data[0].comments)
        }).catch(err => res.send('error finding by name'))
    } else {
        res.send("no matches")
    }
})

router.post('/comments/by-id/', function(req, res) {
    if (req.query.id || req.body.id) {
        User.find({ _id: req.query.id || req.body.id }, function(err, data) {
            if (err) {
                console.error(err)
            }
            console.log(data)
            res.json(data[0].comments)
        }).catch(err => res.send('error finding by id'))
    } else {
        res.send("no matches")
    }
})

router.post('/videos/by-id/', function(req, res) {
    if (req.query.id || req.body.id) {
        User.find({ _id: req.query.id || req.body.id }, function(err, data) {
            if (err) {
                console.error(err)
            }
            // console.log('videos in login api is ', data[0].videos)
            res.json(data[0].videos)
        }).catch(err => res.send('error finding by id'))
    } else {
        res.send("no matches")
    }
})

router.post('/videos/by-name/', function(req, res) {
    if (req.query.name || req.body.name) {
        User.find({ name: req.query.name || req.body.name }, function(err, data) {
            if (err) {
                console.log(err)
            }
            res.json(data[0].videos)
        }).catch(err => res.send('error finding by name'))
    } else {
        res.send("no matches")
    }
})

router.get('/comment/upload/:chanId/:parentId/:textOriginal', async(req, res) => {
    const data = req.params
    let result = await youtube.addComment(data.chanId, data.parentID, data.textOriginal, req.user.access_token, req.user.refresh_token, keys)
    res.send(result)
})

router.post('/comments/uploader/', async(req, res) => {
    console.log('hit with', req.body, Object.keys(req.user), req.user._doc.refresh_token, req.user._doc.access_token)
    const data = req.body
    let result = await youtube.addComment(data.chanId, data.parentID, data.textOriginal, req.user._doc.access_token, req.user._doc.refresh_token, keys)
    res.send(result)

})

router.post('/comments/reply/', async(req, res) => {
    console.log('hit with in reply route', req.body, req.user)
    const data = req.body
    let result = await youtube.replyToComment(data.commentId, data.chanId, data.parentID, data.textOriginal, req.user.access_token, req.user.refresh_token, keys)
    res.send(result)

})
router.get('/all-data/by-id', function(req, res) {
    if (req.query.id || req.body.id) {
        User.find({ _id: req.query.id || req.body.id }, function(err, data) {
            if (err) {
                console.log(err)
            }
            // console.log('sending this back to FE', data)
            res.json(data)
        }).catch(err => res.send('error finding by id'))
    } else {
        res.send("no matches")
    }
})
router.post('/all-data/by-id/:id', function(req, res) {
    if (req.query.id || req.body.id || req.params.id) {
        User.find({ _id: req.query.id || req.body.id || req.params.id }, function(err, data) {
            if (err) {
                console.error(err.message)
            }
            res.json(data)
        }).catch(err => res.send('error finding by id'))
    } else {
        res.send("no matches")
    }
})

router.post('/all-data/by-name', function(req, res) {
    console.log('ding', req.query, req.params, req.body)

    if (req.query.name || req.body.name) {
        User.find({ name: req.query.name || req.body.name }, function(err, data) {
            if (err) {
                console.log(err)
            }
            res.json(data)
        }).catch(err => res.send('error finding by name'))
    } else {
        res.json('not found')
    }
})

router.get('/sample', function(req, res) {
    User.find({ name: 'ph8tel' }, function(err, data) {
        if (err) {
            console.log(err)
        }
        res.json(data)
    }).catch(err => res.send('error finding by name'))
})



module.exports = router;