const assert = require('chai').assert;
const axios = require('axios');

describe('deepSentimentAnalysis', function () {	
  it('should receive a collection of comments, analyze them and post them to the db', async (done) => {
    const videoComments = await axios.post('http://localhost:5001/appQuery', {
      query: `SELECT * FROM comments`
    });
    axios.post('http://localhost:5001/analyze/comments', {
      comments: videoComments.data
    })
    .then((response) => {
      console.log('inside response then')
      //console.log('response is ', response)
      assert.equal(response.status, 200)
    })
    .catch((err) => {
      console.log('err in mass SA update test')
    })
    // .then(() => done())    
  })
})