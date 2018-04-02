const assert = require('chai').assert;
const axios = require('axios');

describe('deepSentimentAnalysis', () => {
	let data;
  it ('should detect sarcasm that would otherwise sound like praise', () => {	
  	axios.post('http://localhost:5001/analyze', {
  		text: 'Great Job. Your work blows.'
  	})
  	.then((response) => {
  		console.log('response in test is ', response.data)
  		assert.equal(response.data < -1, true)
  	})
  	.catch((err) => {
  		console.log('err in SA test is ', err)
  	})  	
  })  
})