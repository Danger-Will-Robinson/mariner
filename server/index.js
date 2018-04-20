var express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const db = require('../database/preferences')
const axios = require('axios');
const queryController = require('../controllers/queryController');
var currentUser;
//sample data routes
var ALLVIDEOS = require('../data/youTubeAllVideoResponse');

router.get('/', (req, res) => {
    console.log('redir new user')
    res.redirect('http://localhost:3000')
})

router.get('/:name/:id', (req, res) => {
    let user = {
        name: req.params.name,
        id: req.params.id
    }
    currentUser = user; // res.render('index', { user: user })
    console.log('I think you are ', currentUser.name);
    res.redirect(`http://localhost:8080/`);
});

router.post('/query/', queryController.queryCommentDB);

router.get('/getUser', (req, res) => {
    // send user name to front end
    if (currentUser) {
        res.json(currentUser);
    } else {
        // res.redirect('http://localhost:8080');
        res.end();
    }
});

router.get('/getUserToken:id', function(req, res, next) {
    //reach out to joe's oauth app
    //return user token string
    //on port ;;4444
})
router.get('/allvideos/:token', function(req, res, next) {
    //reach out to videos db app.
    //on port 4445
    //sends back json of needed info
});

router.get('/videodatabase/addVideo', function(req, res, next) {
    let videoData = req.param;
    db.query(`INSERT INTO users (username, google_auth) VALUES ('Sonic', 'A8BC0293DD')`, function cb(err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log('Yay it worked');
        }
    });
    res.status(err.status || 500);
    res.end();
});

module.exports = router;