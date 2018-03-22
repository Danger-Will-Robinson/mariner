const assert = require('chai').assert;
//const app = require('../app.js')
const identifyQuestion = require('../routes/comments.js').identifyQuestion

describe('identifyQuestions', function() {
  
  it('should return true for a question', function() {
    let question = 'do you think this will work?';
    assert.equal(identifyQuestion(question), 'T');
  });

  it('should pick out questions from multiple statements', ()  => {
    let question = 'Nice work today. Next time do you think you can get here earlier? That would be great.';
    assert.equal(identifyQuestion(question), 'T');
  });

  it ('should return true if last sentence is a question', () => {
    let str = 'Great Video. I love the camera style you used. Where was this shot?';
    assert.equal(identifyQuestion(str), 'T');
  });


  it ('should return false if there are no questions', () => {
    let str = 'This is so cool! I would love to go myself someday. Thanks for sharing!!';
    assert.equal(identifyQuestion(str), 'F');
  }) 

})