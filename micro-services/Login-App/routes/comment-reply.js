const keys = require('../config/keys')
const express = require('express')
const router = new express.Router()

const google = require('googleapis')
const youTubeDataApi = google.google.youtube('v3')

const OAuth2 = google.google.auth.OAuth2
const oauth2Client = new OAuth2(keys.youTube.clientID, keys.youTube.clientSecret, [])

const User = require('../models/user-model')

router.get('/post', (req, res) => {
    console.log('now in post test the token is ', req.user)
    User.findOne({ _id: req.user._id }).then((currentUser) => {
        if (currentUser) {
            done(null, currentUser);
        }
    })
    oauth2Client.setCredentials({

        refresh_token: req.user.refresh_token,
        access_token: req.user.access_token
    });
    google.google.options({ auth: oauth2Client })
    let params = {
        auth: oauth2Client,
        part: "snippet",
        resource: {
            snippet: {
                channelId: "UCchBrk2DASIFP0aEyfoCOAg",
                videoId: "J03msr1ExRI",
                topLevelComment: {
                    snippet: {
                        textOriginal: "MARINER IS THE BEST EVER!"
                    }
                }
            }
        }
    }

    youTubeDataApi.commentThreads.insert(params, (err, info) => {
        if (err) {
            console.log('hit failure', err.message);
            res.status(400).send("failed posting comment");
        } else {
            console.log('comment posted', info.statusText);
            res.status(200).send("posted comment");
        }
    });
})
module.exports = router