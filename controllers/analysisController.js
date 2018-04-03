const axios = require('axios');
const english = require('retext-english');
const sentiment = require('retext-sentiment');
const unified = require('unified');
const inspect = require('unist-util-inspect');

const processor = unified()
  .use(english)
  .use(sentiment);

// This controller will take comments and get scores from the SA
// module. It will handle a large # of comments.

exports.analyzeComments = (req, res) => {
    console.log('Analysis endpoint hit with POST');
    res.end();
}