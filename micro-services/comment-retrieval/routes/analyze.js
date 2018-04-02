const express = require('express');
const router = express.Router();
const shortTextAnalyzer = require('../helpers/shortText.js')
const preDefine = require('../helpers/preDefine')
const inspect = require('unist-util-inspect');
const unified = require('unified');
const english = require('retext-english');
const retext = require('retext-sentiment');
const sentiment = require('sentiment');

const R = require('ramda');


preDefine()


router.post('/', (req, res, next) => {
	console.log('SA post happening req.body looks like ', req.body);
	let text = req.body.text;
	let result;

	if (text.length < 30) {
		result = shortTextAnalyzer(text);
		//res.json(result);
		//console.log('result is ', result)
	} else {
		let processor = unified()
	    .use(english)
	    .use(retext)

	  let tree = processor.parse(text);

	  processor.run(tree, text);
	  console.log('tree inspect looks like ', inspect(tree));
	  result = R.pluck('polarity', tree);
	  console.log('result is ', result.data); 
	}	
	console.log('result before sending ', result)
	res.json(result); 
})



module.exports = router;