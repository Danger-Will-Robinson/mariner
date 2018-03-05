var express = require('express');
var router = express.Router();
var runTest = require('../testing/testLogic.js')

/* GET home page. */
router.get('/', async(req, res, next) => {
    console.log('root ran')
    let loginResult = awaitrunTest.login('UCCooOt2LDAfz-5giM99biUQ')
    let hasId = true
        // res.render('index', { title: 'Express' });
    res.render('all', {
        user: {
            name: 'ph8tel',
            id: 'UCCooOt2LDAfz-5giM99biUQ',
            tests: {
                login: loginResult,
                hasId: hasIdResult
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