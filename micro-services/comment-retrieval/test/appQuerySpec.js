const assert = require('chai').assert;
const axios = require('axios');

describe('appQuery returns', () => {
	it('should return a 200 when a proper query is posted', () => {
		axios.post('http://localhost:5001/appQuery', {
			query: 'Select * FROM comments'
		})
		.then((response) => {
			assert.equal(response.status, 200);
		})
		.catch((err) => {
			console.log('err is ', err);
		})
	})
  
  it ('should return a 500 when improper query is posted', () => {
  	axios.post('http://localhost:5001/appQuery', {
			query: 'Select  FROM comments'
		})
		.then((response) => {
			assert.equal(response.status, 500);
		})
		.catch((err) => {
			console.log('err is ');
		})
  })

})
