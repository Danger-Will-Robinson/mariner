var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('############req.body.data', req.params, '#################')
    res.render('index', { data: [], comments: [] });
});

module.exports = router;