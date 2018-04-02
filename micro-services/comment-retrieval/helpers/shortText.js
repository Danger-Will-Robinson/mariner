let sentiment = require('sentiment');

let shortTextAnalyzer = (text) => {
  let analysis = sentiment(text);
  let adjust = 0;
  let result = 0;
  let goodWords = analysis.positive;
  let badWords = analysis.negative;
  let allWords = analysis.words;
  
  if (goodWords.length === badWords.length && allWords.length > 1 && badWords.includes(allWords[0])) {
  	adjust = -3 
  }
  else if (goodWords.length === badWords.length && allWords.length > 1 && goodWords.includes(allWords[0])) {
  	adjust += 3
  } 
  result = analysis.score + adjust;
  return result;  
}

module.exports = shortTextAnalyzer