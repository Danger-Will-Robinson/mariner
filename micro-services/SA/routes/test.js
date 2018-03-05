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
        res.render('text', { text: testData, result: textResult.result, data: textResult.data, raw: textResult.raw })
    } else {
        res.send('not in place yet')
    }
    // res.render('', { user: {name: , id:  }})
})
router.get('/negative', async(req, res) => {
    let negativeStatement = "angry bad hate ugly";
    let result = await runTest.text(negativeStatement);
    let valenceResult = result.data.valence === 'negative'
    let polarityResult = result.data.polarity < 0
    let typeResult = typeof result.raw === 'object'

    res.render('negative', { valenceResult: valenceResult, polarityResult: polarityResult, typeResult: typeResult, text: negativeStatement })
})
router.get('/positive', async(req, res) => {
    let statement = "happy love good pretty";
    let result = await runTest.text(statement);
    let valenceResult = result.data.valence === 'positive'
    let polarityResult = result.data.polarity < 0
    let typeResult = typeof result.raw === 'object'

    res.render('positive', { text: statement, valenceResult: valenceResult, polarityResult: polarityResult, typeResult: typeResult })
})
module.exports = router;