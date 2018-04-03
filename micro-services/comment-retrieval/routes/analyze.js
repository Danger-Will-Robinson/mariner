const express = require('express');
const router = express.Router();
const db = require('../db/index');
const shortTextAnalyzer = require('../helpers/shortText.js')
const preDefine = require('../helpers/preDefine')
const inspect = require('unist-util-inspect');
const unified = require('unified');
const english = require('retext-english');
const retext = require('retext-sentiment');
const sentiment = require('sentiment');

const R = require('ramda');


preDefine();

let processor = unified()
  .use(english)
	.use(retext)

router.post('/comments', (req, res, next) => {
	db.query('use ThesisDB');
	//console.log('req.body in analyze/comments looks like ', req.body);
	let result;
	req.body.comments.forEach((comment, index) => {
		let text = comment.comment
		console.log('inside for each')
		if (text.length < 60) {
      result = shortTextAnalyzer(text);
		} else {
			let tree = processor.parse(text);
			processor.run(tree, text);
			result = R.pluck('polarity', tree).data;
			//console.log('result is ', result.data); 
		}
	  db.query(`UPDATE comments SET SA = ${result} where idcomments = ${comment.idcomments}`, (err, result) => {
      if (err) {
      	console.log(`err updating SA at index ${index} err looks like ${err} result looks like ${result}`)
      	// res.status(500).send();
      	// res.end();
      } else {
      	console.log('updated SA in db')
      }
	  })  	
	})
	res.status(200).send()
  res.end()
})

router.post('/', (req, res, next) => {

 	console.log('SA post happening req.body looks like ', req.body);
	let text = req.body.text;
	let result;

	if (text.length < 60) {
		result = shortTextAnalyzer(text);
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