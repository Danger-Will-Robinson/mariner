const router = require('express').Router();
const keys = require('../config/keys');
const bodyParser = require('body-parser');
const User = require('../models/user-model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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
});
router.post('/comments/by-id/', function(req, res) {
    if (req.query.id || req.body.id) {
        User.find({ _id: req.query.id || req.body.id }, function(err, data) {
            if (err) {
                console.log(err)
            }
            console.log(data)
            res.json(data[0].comments)
        }).catch(err => res.send('error finding by id'))
    } else {
        res.send("no matches")
    }
});
router.post('/videos/by-id/', function(req, res) {
    if (req.query.id || req.body.id) {
        User.find({ _id: req.query.id || req.body.id }, function(err, data) {
            if (err) {
                console.log(err)
            }
            res.json(data[0].videos)
        }).catch(err => res.send('error finding by id'))
    } else {
        res.send("no matches")
    }
});
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
});
router.post('/all-data/by-id', function(req, res) {
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
});
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
});
router.get('/sample', function(req, res) {
    User.find({ name: 'ph8tel' }, function(err, data) {
        if (err) {
            console.log(err)
        }
        res.json(data)
    }).catch(err => res.send('error finding by name'))
})



module.exports = router;