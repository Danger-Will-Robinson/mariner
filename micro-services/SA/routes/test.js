var express = require('express');
var router = express.Router();
var runTest = require('../testing/testLogic.js')

/* hard coded results route */
router.get('/', async(req, res, next) => {
    let sampleUser = {
        name: 'ph8tel',
        id: 'UCCooOt2LDAfz-5giM99biUQ'
    }
    let loginResult = await runTest.login(sampleUser.id)
    let hasIdResult = loginResult
    res.render('testing/all', {
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

router.post('/text/', async(req, res) => {
    let text = req.body.text;
    console.log(text, req.body, req.params, 'text')
    let textResult = await runTest.text(text)

    res.render('testing/text', { text: text, result: textResult.result, data: textResult.data, raw: textResult.raw })
})
router.get('/negative', async(req, res) => {
    let negativeStatement = "angry bad hate ugly";
    let result = await runTest.text(negativeStatement);
    let valenceResult = result.data.valence === 'negative'
    let polarityResult = result.data.polarity < 0
    let typeResult = typeof result.raw === 'object'

    res.render('testing/negative', { valenceResult: valenceResult, polarityResult: polarityResult, typeResult: typeResult, text: negativeStatement })
})
router.get('/positive', async(req, res) => {
    let statement = "happy love good pretty";
    let result = await runTest.text(statement);
    let valenceResult = result.data.valence === 'positive'
    let polarityResult = result.data.polarity < 0
    let typeResult = typeof result.raw === 'object'

    res.render('testing/positive', { text: statement, valenceResult: valenceResult, polarityResult: polarityResult, typeResult: typeResult })
})
module.exports = router;