var express = require('express');
var router = express.Router();
var inspect = require('unist-util-inspect');
var unified = require('unified');
var english = require('retext-english');
var sentiment = require('retext-sentiment');

/* GET home page. */
router.get('/text/:text', function(req, res, next) {
    let text = req.params.text;
    let result
    console.log('got text')

    var processor = unified()
        .use(english)
        .use(sentiment);

    var file = "this is the text from req"
    var tree = processor.parse(file);

    processor.run(tree, file);
    console.log(inspect(tree));
    res.json(tree)

});

module.exports = router;