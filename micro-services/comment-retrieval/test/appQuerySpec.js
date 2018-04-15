const assert = require('chai').assert;
const axios = require('axios');

describe('appQuery returns', () => {
  it('should return a 200 when a proper query is posted', (done) => {
  	let statusCode;
	axios.post('http://localhost:5001/appQuery', {
	  query: 'Select * FROM comments'
	})
	.then((response) => {
	  console.log('success! ', response.status)
	  assert.equal(response.status, 200)
	  //response.status.should.equal(200)
	})
	.then(() => done(), done)
	.catch((err) => {
	  console.log('err in 200 test ', err.response.status)
	})
  })
  
 //  it ('should return a 500 when improper query is posted', (done) => {
 //  	let statusCode;
 //  	axios.post('http://localhost:5001/appQuery', {
	//   query: 'Select  FROM comments'
	// })
	// .then((response) => {
 //      console.log('response.status is ', response.status)	
	// })
	// .catch((err) => {
	//   console.log('err in 500 test ', err.response.status);
	//   statusCode = err.response.status;
	//   assert.equal(statusCode, 500)
	// })
	// .then(() => done(), done)
 //  })

})
