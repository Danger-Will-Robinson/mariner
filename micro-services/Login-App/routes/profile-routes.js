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
    res.render('profile', { user: req.user });
});


// router.get('/youtube', authCheck, function(req, res) {
//     console.log('req in prof is ', req.user, 'sddsf')
//     var config = {
//         clientID: keys.youTube.clientID,
//         clientSecret: keys.youTube.clientSecret,
//         callbackURL: 'http://localhost:3000/auth/youtube'
//     };
//     var oauth2Client = new OAuth2(
//         config.clientID,
//         config.clientSecret,
//         config.callbackURL
//     );

//     oauth2Client.credentials = {
//         access_token: req.user.access_token,
//         refresh_token: req.user.refresh_token
//     };
//     google.google.youtube({
//         version: 'v3',
//         auth: oauth2Client
//     }).search.list({
//         part: 'snippet',
//         type: 'video',
//         mine: true
//             // playlistId: 'UUCooOt2LDAfz-5giM99biUQ'
//             // UUCooOt2LDAfz-5giM99biUQ
//     }, function(err, data, response) {
//         console.log('datdata is', data.data.items)
//             // console.log('items ', data.data.items)
//             // console.log('deets', data.data.items[0].contentDetails)
//             // console.log("conet deewer", data.data.items[0].contentDetails.relatedPlaylists.uploads)
//         if (err) {
//             console.error('Error: ' + err);
//             res.json({
//                 status: "error"
//             });
//         }
//         if (data.data) {

//             res.render('youtubeVideos', { user: req.user, data: data.data })
//                 // res.json({
//                 //     status: "ok",
//                 //     data: data.data
//                 // });
//         }
//         if (response) {
//             console.log('Status code: ' + response.statusCode);
//         }
//     })
// });


router.get('/youtube', authCheck, function(req, res) {
    console.log('req in prof is ', req.user, 'sddsf')
    var config = {
        clientID: keys.youTube.clientID,
        clientSecret: keys.youTube.clientSecret,
        callbackURL: 'http://localhost:3000/auth/youtube'
    };
    var oauth2Client = new OAuth2(
        config.clientID,
        config.clientSecret,
        config.callbackURL
    );

    oauth2Client.credentials = {
        access_token: req.user.access_token,
        refresh_token: req.user.refresh_token
    };
    google.google.youtube({
        version: 'v3',
        auth: oauth2Client
    }).channels.list({
        // part: 'snippet',
        part: 'snippet,contentDetails',
        mine: true,
        // q: req.user._id,
        headers: {}
    }, function(err, data, response) {
        if (err) {
            console.error('Error: ' + err);
            res.json({
                status: "error"
            });
        }
        if (data.data) {
            console.log('datdata is', data.data)
            console.log('items ', data.data.items)
            console.log('deets', data.data.items[0].contentDetails)
            console.log("conet deewer", data.data.items[0].contentDetails.relatedPlaylists.uploads)
            res.render('youtubeVideos', { user: req.user, data: data.data })
                // res.json({
                //     status: "ok",
                //     data: data.data
                // });
        }
        if (response) {
            console.log('Status code: ' + response.statusCode);
        }
    });
});



module.exports = router;