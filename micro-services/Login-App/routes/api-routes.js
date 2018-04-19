const router = require('express').Router();
const bodyParser = require('body-parser');

const youtube = require('../youtubeLogic/youtube')
const keys = require('../config/keys');

const google = require('googleapis')
const youTubeDataApi = google.google.youtube('v3')
const OAuth2 = google.google.auth.OAuth2
const oauth2Client = new OAuth2(keys.youTube.clientID, keys.youTube.clientSecret, [])
google.google.options({ auth: oauth2Client })

const User = require('../models/user-model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

router.get('/user/tokens/:id', (req, res) => {
    let userId = req.params.id;
    console.log('user info is', userId)
    res.json(req.user)
})

router.post('/comments/by-name/', (req, res) => {
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

router.post('/comments/by-id/', (req, res) => {
    if (req.query.id || req.body.id) {
        User.find({ _id: req.query.id || req.body.id }, function(err, data) {
            if (err) {
                console.error(err)
            }
            res.json(data[0].comments)
        }).catch(err => res.send('error finding by id'))
    } else {
        res.send("no matches")
    }
})

router.post('/videos/by-id/', (req, res) => {
    if (req.query.id || req.body.id) {
        User.find({ _id: req.query.id || req.body.id }, function(err, data) {
            if (err) {
                console.error(err)
            }
            res.json(data[0].videos)
        }).catch(err => res.send('error finding by id'))
    } else {
        res.send("no matches")
    }
})

router.post('/videos/by-name/', (req, res) => {
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
    const data = req.body
    let result = await youtube.addComment(data.chanId, data.parentID, data.textOriginal, req.user._doc.access_token, req.user._doc.refresh_token, keys)
    res.send(result)

})

router.post('/comments/reply/', async(req, res) => {
    const data = req.body
    let result = await youtube.replyToComment(data.commentId, data.chanId, data.parentID, data.textOriginal, req.user.access_token, req.user.refresh_token, keys)
    res.send(result)

})

router.get('/all-data/by-id', (req, res) => {
    if (req.query.id || req.body.id) {
        User.find({ _id: req.query.id || req.body.id }, function(err, data) {
            if (err) {
                console.log(err)
            }
            res.json(data)
        }).catch(err => res.send('error finding by id'))
    } else {
        res.send("no matches")
    }
})
router.post('/all-data/by-id/:id', (req, res) => {
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

router.post('/all-data/by-name', (req, res) => {
    if (req.query.name || req.body.name || req.params.name) {
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

router.get('/sample', (req, res) => {
    User.find({ name: 'ph8tel' }, function(err, data) {
        if (err) {
            console.log(err)
        }
        res.json(data)
    }).catch(err => res.send('error finding by name'))
})

router.get('comments/reply/thread', async(req, res) => {
    let commentId = req.body.commentId
    let thread = await youtube.getReplies(commentId, keys.youTube.API_KEY)
    res.json(thread)
})

router.get('/comments/refresh', async(req, res) => {
    let newComments = await youtube.getComments(req.user._id, keys.youTube.API_KEY)
    req.user.comments = newComments
    let dbParams = { comments: newComments }
    writeToDb(req.user._id, dbParams)
    sendToCr(req.user)
    res.json(newComments)
})

router.get('/comments/replytodirect/', (req, res) => {

    oauth2Client.setCredentials({

        refresh_token: req.user.refresh_token,
        access_token: req.user.access_token
    })
    let params = {
        auth: oauth2Client,
        part: "snippet",
        resource: {
            snippet: {
                videoId: req.body.videoId,
                parentId: req.body.commentId,
                textOriginal: req.body.textOriginal
            }
        }
    }
    console.log(params.resource.snippet.textOriginal, 'sent')
    res.status(200).send("posted comment")

    youTubeDataApi.comments.insert(params, (err, info) => {
        if (err) {
            console.log('hit failure', err.message)
            res.status(400).send("failed posting comment")
        } else {
            console.log('comment posted', info.statusText)
            res.status(200).send("posted comment")
        }
    })
});

router.post('/comments/replytodirect/', (req, res) => {

    oauth2Client.setCredentials({
        refresh_token: req.body.refresh_token,
        access_token: req.body.access_token
    })

    let params = {
        auth: oauth2Client,
        part: "snippet",
        resource: {
            snippet: {
                videoId: req.body.videoId,
                parentId: req.body.commentId,
                textOriginal: req.body.textOriginal
            }
        }
    }

    console.log(params.resource.snippet.textOriginal, 'sent')
    res.status(200).send("posted comment");

    youTubeDataApi.comments.insert(params, (err, info) => {
        if (err) {
            console.log('hit failure', err.message)
            res.status(400).send("failed posting comment")
        } else {
            console.log('comment posted', info.statusText)
            res.status(200).send("posted comment")
        }
    })
})

router.get('/user/all-data', async(req, res) => {
    let data = await youtube.gimmeAll(req.user._id)
    res.json(data)
})

var sendToCr = (user) => {
    console.log('user sent to CR for update')
}

var writeToDb = (id, data) => {
    User.findOneAndUpdate({ _id: id }, { $set: data }, { upsert: true, returnNewDocument: true, fields: 'data' }, function(err, data) {
        if (err) {
            console.error(err.message, 'err in update db')
        }
        console.log('db is updated')
    })
}



module.exports = router;