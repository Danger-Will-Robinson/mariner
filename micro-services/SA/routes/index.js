var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
// tsting route
router.get('/test/:testName', (req, res) => {
    let testName = req.params.testName;
    if (testName === 'basic') {
        res.render('basic')
    }
    res.render('all', { user: { name: 'ph8tel', id: 'UCCooOt2LDAfz-5giM99biUQ' } })
})

module.exports = router;