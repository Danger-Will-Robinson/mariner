const express = require('express');
const queryController = require('../controllers/queryController');
const router = express.Router();

router.post('/query', (req, res) => {
  console.log('Post made to /query');
  res.end();
});

router.post('/query', queryController.queryCommentDB);

module.exports = router;