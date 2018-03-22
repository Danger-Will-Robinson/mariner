const assert = require('chai').assert;
//const app = require('../app.js')
const identifyQuestion = require('../routes/comments.js').identifyQuestion

describe('identifyQuestions', function() {
  
  it('should return true for a question', function() {
    let question = 'do you think this will work?';
    assert.equal(identifyQuestion(question), 'T');
  });

  it('should pick out a question from multiple statements', ()  => {
    let question = 'Nice work today. Next time do you think you can get here earlier? That would be great.';
    assert.equal(identifyQuestion(question), 'T');
  }) 

})