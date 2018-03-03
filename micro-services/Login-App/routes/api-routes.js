const router = require('express').Router();
const keys = require('../config/keys');
const bodyParser = require('body-parser');
const User = require('../models/user-model');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/comments/by-name/:name', function(req, res) {
    if (req.query.name) {
        User.find({ name: req.query.name }, function(err, data) {
            if (err) {
                console.log(err)
            }
            res.json(data[0].comments)
        }).catch(err => res.send('error finding by name'))
    }
});
router.get('/comments/by-id/', function(req, res) {
    if (req.query.id) {
        User.find({ _id: req.query.id }, function(err, data) {
            if (err) {
                console.log(err)
            }
            res.json(data[0].comments)
        }).catch(err => res.send('error finding by id'))
    }
});
router.get('/videos/by-id/', function(req, res) {
    if (req.query.id) {
        User.find({ _id: req.query.id }, function(err, data) {
            if (err) {
                console.log(err)
            }
            res.json(data[0].videos)
        }).catch(err => res.send('error finding by id'))
    }
});
router.get('/videos/by-name/', function(req, res) {
    if (req.query.name) {
        User.find({ name: req.query.name }, function(err, data) {
            if (err) {
                console.log(err)
            }
            res.json(data[0].videos)
        }).catch(err => res.send('error finding by name'))
    }
});
router.get('/all-data/by-id', function(req, res) {
    if (req.query.id) {
        User.find({ _id: req.query.id }, function(err, data) {
            if (err) {
                console.log(err)
            }
            res.json(data)
        }).catch(err => res.send('error finding by id'))
    }
});
router.get('all-data/by-name', function(req, res) {
    if (req.query.name) {
        User.find({ name: req.query.name }, function(err, data) {
            if (err) {
                console.log(err)
            }
            res.json(data)
        }).catch(err => res.send('error finding by name'))
    } else {
        res.json('not found')
    }
});



module.exports = router;