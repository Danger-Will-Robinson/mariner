const express = require('express');
const router = express.Router();
const inspect = require('unist-util-inspect');
const unified = require('unified');
const english = require('retext-english');
const sentiment = require('retext-sentiment');
const R = require('ramda');
const bodyParser = require('body-parser');


router.post('/', (req, res, next) => {
	console.log('SA post happening req.body looks like ', req.body);
	let text = req.body.text;
	let result;

	let processor = unified()
	  .use(english)
	  .use(sentiment)

	let tree = processor.parse(text);

	processor.run(tree, text);
	console.log('tree inspect looks like ', inspect(tree));
	result = R.pluck('polarity', tree);
	console.log('result is ', result.data); 
	res.json(tree); 
})

module.exports = router;