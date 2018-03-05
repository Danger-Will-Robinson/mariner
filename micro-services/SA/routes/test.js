var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('root ran')
        // res.render('index', { title: 'Express' });
    res.render('all', {
        user: {
            name: 'ph8tel',
            id: 'UCCooOt2LDAfz-5giM99biUQ',
            tests: {
                loginResult: true,

            }
        }
    })

});
// tsting route
router.get('/:testName', (req, res) => {
    let testName = req.params.testName;
    if (testName === 'basic') {
        res.render('basic')
    }
    res.send('not in place yet')
        // res.render('', { user: {name: , id:  }})
})

module.exports = router;