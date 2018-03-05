// put this in your app route 
// app.use('/test', test);
var express = require('express');
var router = express.Router();
// make this file with following snippet
var runTest = require('../testing/testLogic.js')

/* hard coded results page. */
router.get('/', async(req, res, next) => {
    let sampleUser = {
        name: 'ph8tel',
        id: 'UCCooOt2LDAfz-5giM99biUQ'
    }
    let loginResult = await runTest.login(sampleUser.id)
    let hasIdResult = loginResult
    res.render('all', {
        user: {
            name: sampleUser.name,
            id: sampleUser.id,
            tests: {
                loginResult: loginResult,
                hasId: hasIdResult
            }
        }
    })

});
// tsting route
router.get('/:testName/:testData', async(req, res) => {
    let testName = req.params.testName;
    let testData = req.params.testData
    console.log(testData, 'test data')
    if (testName === 'basic') {
        res.render('basic')
    }
    if (testName === 'text') {
        let textResult = await runTest.text(testData)
        res.render('text', { result: textResult.result, data: textResult.data })
    } else {
        res.send('not in place yet')
    }
    // res.render('', { user: {name: , id:  }})
})

module.exports = router;