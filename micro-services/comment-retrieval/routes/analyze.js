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
const axios = require('axios');
const queues = require('queue')
const R = require('ramda');

const q = queues();
const queue = taskQueue();
let failedRequests = 0;

// queue.on('failed:apiRequest', (task) => {
//   failedRequests++;
// })

// queue.define('apiRequest', (comment) => {
// 		let text = comment.comment;
// 		if (text.length < 100) {
//       result = shortTextAnalyzer(text);
// 		} else {
// 			let tree = processor.parse(text);
// 			processor.run(tree, text);
// 			result = R.pluck('polarity', tree).data;
// 			if (result > -2 && result < 2) {
// 			  result = shortTextAnalyzer(text);	
// 			} 
// 		}
// 		return promise.try(() => {
// 			return db.query(`UPDATE comments SET SA = ${result} where idcomments = ${comment.idcomments}`, (err, res) => {
// 				if (err) {
// 					console.log('err in dbupdate ', err)
// 				} else {
// 					console.log('udated SA in db')
// 				}
// 			})		  
// 		})
// 		.then((res) => {
// 		  //console.log('res.body is ', res)

// 		  return res
// 		})
// 		.catch((err) => {
// 		  console.log('err in db query is ', err)
// 		})
// }, {
// 	concurrency: 10
// })



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
    // q.emit('end', () => {
    // 	console.log('finito')
    // })
    console.log('all done:')
  })
		


	// 	if (index % 2 !== 0) {
	// 		//console.log('inside if queue')
	// 		axios.post('http://localhost:5002/analyze', {
	// 			data: comment
	// 		})
	// 		.then((res) => {
	// 			console.log('res.status from alternate route ', res.status)
	// 		})
	// 		.catch((err) => {
	// 			console.log('err in alternate route')
	// 		})
	// 	} else {
	// 	  promise.try(() => {
	// 		  return queue.push('apiRequest', comment)
	// 	  })
	// 	  .then((jsonResponse) => {
 //        console.log(`updated comment for ${comment.idcomments} jsonResponse is `)
	// 	  })
	// 	  .catch((err) => {
	// 		  console.log('err in for each ', err)
	// 	  })	

	// 	}
	// })

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