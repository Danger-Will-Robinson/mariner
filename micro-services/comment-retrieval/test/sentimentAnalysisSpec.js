const assert = require('chai').assert;
const axios = require('axios');

describe('deepSentimentAnalysis', () => {
	let data;
  
  it ('should detect sarcasm that would otherwise sound like praise', (done) => {	
  	axios.post('http://localhost:5001/analyze', {
  		text: 'Great Job. Your work blows.'
  	})
  	.then((response) => {
  		console.log('response.data first is ', response.data)
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
  		console.log('response.data is ', response.data)
  		assert.equal(response.data > 1, true);
  	})
  	.then(() => done (), done)
  	.catch((err) => {
  		console.log('err in SA test #2 ');
  	})

  })
})