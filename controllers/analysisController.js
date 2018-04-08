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
    // console.log('Analysis endpoint hit with POST');

    // Retrieve comment out of req.body:
    const comment = req.body.comment;

    console.log(req.body);
    // Create sentence/word tree:
    const tree = processor.parse(comment);
    // process.run is needed to produce the "valance" of each word:
    processor.run(tree, comment);
    // Print out tree with analysis of each word:
    // console.log(inspect(tree));

    // Pull out "Data" object from tree:
    const { data } = tree;

    // Print out valence: (Positive, Neutral, Negative)
    console.log(data.valence);
    // Print out polarity: (Score from -10 to 10):
    console.log(data.polarity);

    // Send back object containing full analysis:
    res.json(tree);
}