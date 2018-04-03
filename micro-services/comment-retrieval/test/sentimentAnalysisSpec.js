const assert = require('chai').assert;
const axios = require('axios');

describe('deepSentimentAnalysis', () => {
	let data;
  
  it ('should detect sarcasm that would otherwise sound like praise', (done) => {	
  	axios.post('http://localhost:5001/analyze', {
  		text: 'Great Job. Your work blows.'
  	})
  	.then((response) => {
  		assert.equal(response.data < -1, true)
  	})
  	.then(() => done(), done)
  	.catch((err) => {
  		console.log('err in SA test is ')
  	})  	
  })
  
  it('should detect praise within the context of low scoring words', (done) => {
  	axios.post('http://localhost:5001/analyze', {
  		text: 'Those judges were dumb. You were amazing!'
  	})
  	.then((response) => {
  		assert.equal(response.data > 1, true);
  	})
  	.then(() => done (), done)
  	.catch((err) => {
  		console.log('err in SA test #2 ');
  	})
  })
  it('should receive a collection of comments, analyze them and post them to the db', async () => {
    const videoComments = await axios.post('http://localhost:5001/appQuery', {
      query: `SELECT * FROM comments`
    });
    const analyzeComments = await axios.post('http://localhost:5001/analyze/comments', {
      comments: videoComments.data
    })
    assert.equal(analyzeComments.status, 200)
  })
})