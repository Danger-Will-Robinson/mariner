const axios = require('axios');

// Query to Comment-Retrieval app is sent in request body
// Comment-Retrieval has a route set up to extract query and execute that on its database.
exports.queryCommentDB = (req, res) => {
  console.log('Processing query');
  let query = req.body.query;
  console.log(query);

  // Make request to comment-retrieval service:
  axios.post('http://localhost:5001/appQuery', {
    query: query
  })
  .then(function(response) {
    res.json(response.data);
  })
  .catch(function(error) {
    console.error(error);
    res.end();
  });
};