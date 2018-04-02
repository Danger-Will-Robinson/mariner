// const assert = require('chai').assert;
// const axios = require('axios');

// describe('appQuery returns', () => {
//   it('should return a 200 when a proper query is posted', () => {
//   	let statusCode;
// 	axios.post('http://localhost:5001/appQuery', {
// 	  query: 'Select * FROM comments'
// 	})
// 	.then((response) => {
// 	  console.log('success! ', response.status)
// 	  statusCode = response.status;
// 	  assert.equal(statusCode, 200)

// 	})
// 	.catch((err) => {
// 	  console.log('err in 200 test ', err.response.status);
// 	  statusCode = err.response.status;
// 	  assert.equal(statusCode, 100)
// 	})
//   })
  
//   it ('should return a 500 when improper query is posted', () => {
//   	let statusCode;
//   	axios.post('http://localhost:5001/appQuery', {
// 	  query: 'Select  FROM comments'
// 	})
// 	.then((response) => {
//       console.log('response.status is ', response.status)	
// 	})
// 	.catch((err) => {
// 	  console.log('err in 500 test ', typeof err.response.status);
// 	  statusCode = err.response.status;
// 	  assert.equal(statusCode, 500)
// 	})
//   })

// })
