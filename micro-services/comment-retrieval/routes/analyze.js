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
const taskQueue = require('promise-task-queue');
const promise = require('bluebird');

const R = require('ramda');

const queue = taskQueue();
console.log('queue looks like ', queue)
const queue2 = taskQueue();
let failedRequests = 0;

queue.on('failed:apiRequest', (task) => {
  failedRequests++;
})

queue.define('apiRequest', (comment) => {
		let text = comment.comment;
		if (text.length < 100) {
      result = shortTextAnalyzer(text);
		} else {
			let tree = processor.parse(text);
			processor.run(tree, text);
			result = R.pluck('polarity', tree).data;
			if (result > -2 && result < 2) {
			  result = shortTextAnalyzer(text);	
			} 
		}
		return promise.try(() => {
			//if index is odd use following db.query straight up
			  //else hit the new post route to 5001 
			console.log('starting promise try in def')
			return db.query(`UPDATE comments SET SA = ${result} where idcomments = ${comment.idcomments}`, (err, res) => {
				if (err) {
					console.log('err in dbupdate ', err)
				} else {
					console.log('udated SA in db')
				}
			})
		  .then((res) => {
		  	console.log('res.body is ', res.body)
		  	return res.body
		  })
		  .catch((err) => {
		  	console.log('err in db query is ', err)
		  })
		})
}, {
	concurrency: 5
})

//queue2.define('apiRequest', )




preDefine();

let processor = unified()
  .use(english)
	.use(retext)

router.post('/comments', (req, res, next) => {
	console.log('anything happening?')
	db.query('use ThesisDB');
	let counter = 0;
	let result;
	
	req.body.comments.forEach((comment, index) => {
		let collection = [];
		if (index % 0 !== 2) {
			collection.push(comment);
		} else {

		}
        
		promise.try(() => {
			return queue.push('apiRequest', comment)
		})
		.then((jsonResponse) => {
          console.log(`updated comment for ${comment.idcomments}`)
		})
		.catch((err) => {
			console.log('err in for each ', err)
		})
		// let text = comment.comment
		// console.log('inside for each')
		// if (text.length < 100) {
  //     result = shortTextAnalyzer(text);
		// } else {
		// 	let tree = processor.parse(text);
		// 	processor.run(tree, text);
		// 	result = R.pluck('polarity', tree).data;
		// 	if (result > -2 && result < 2) {
		// 	  result = shortTextAnalyzer(text);	
		// 	} 
		// }
	 //  db.query(`UPDATE comments SET SA = ${result} where idcomments = ${comment.idcomments}`, (err, result) => {
  //     if (err) {
  //     	console.log(`err updating SA at index ${index} err looks like ${err} result looks like ${result}`)
  //     	// res.status(500).send();
  //     	// res.end();
  //     	next(res.status(500).send())
  //     } else {
  //     	console.log('updated SA in db')
  //     	// counter++
  //     	if (counter === req.body.comments.length) {
  //     		res.status(200).send()
  //     	}
  //     }
	 //  })  	
	})
	// next(res.status(200).send())
	
  // res.end()
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
	  //console.log('tree inspect looks like ', inspect(tree));
	  result = R.pluck('polarity', tree).data;
	  console.log('result is ', result); 
	  if (result > -2 && result < 2) {
		  result = shortTextAnalyzer(text);	
		} 
	}	
	console.log('result before sending ', result)
	res.json(result); 
})



module.exports = router;