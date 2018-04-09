const express = require('express');
const router = express.Router();
const db = require('../db/index');
const shortTextAnalyzer = require('../helpers/shortText.js');
const preDefine = require('../helpers/preDefine');
const inspect = require('unist-util-inspect');
const unified = require('unified');
const english = require('retext-english');
const retext = require('retext-sentiment');
const sentiment = require('sentiment');
const promise = require('bluebird');
const axios = require('axios');
const queues = require('queue')
const R = require('ramda');

const q = queues();




preDefine();

let processor = unified()
  .use(english)
	.use(retext)

router.post('/comments', (req, res, done) => {
	db.query('use ThesisDB');
	
	req.body.comments.forEach((comment, index) => {
		q.push(() => {
			return new Promise((resolve, reject) => {
			  let text = comment.comment;
				let result;
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
		    db.query(`UPDATE comments SET SA = ${result} where idcomments = ${comment.idcomments}`, (err, res) => {
				  if (err) {
					  console.log('err in dbupdate ', err);
					  reject();
				  } else {
					  console.log('udated SA in db at index ', index)
					  resolve();
				  }
			  })		 

        
			})
			.then((jsonResponse) => {
				console.log('inside json')
			})
			.catch((err) => {
				console.log('inside err')
			})
		})
	})
	q.start((err) =>{
    if (err) throw err
    console.log('all done:')
  })
		

})

router.post('/', (req, res, next) => {

 	//console.log('SA post happening req.body looks like ', req.body);
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
	  //console.log('result is ', result); 
	  if (result > -2 && result < 2) {
		  result = shortTextAnalyzer(text);	
		} 
	}	
	//console.log('result before sending ', result)
	res.json(result); 
})




module.exports = router;