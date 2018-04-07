let sentiment = require('sentiment');


let programWords = {
  'blew': -3,
  'blows': -3,
  'sick': 3,
  'dumbass': -3	
}

let preDefine = () => {
  sentiment('', programWords);
}

module.exports = preDefine