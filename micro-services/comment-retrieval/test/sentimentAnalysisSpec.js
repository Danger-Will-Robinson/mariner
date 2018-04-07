const assert = require('chai').assert;
const axios = require('axios');

describe('deepSentimentAnalysis', function () {
	let data;
  //this.timeout(8000)
  
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
  it('should maintain accurate analysis when going over the limit of short text range', (done) => {
    axios.post('http://localhost:5001/analyze', {
      text: 'Hey dumbass! What makes you think you\'re so great? The only reason you got in here was because of your money'
    })
    .then((response) => {
      assert.equal(response.data < -1, true);
    })
    .then(() => done(), done)
    .catch((err) => {
      console.log('err in SA test 3')
    })
   })   
})