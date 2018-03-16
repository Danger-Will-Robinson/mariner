const express = require('express');
const router = express.Router();

router.post('/query', (req, res) => {
  console.log('Post made to /query');
  res.end();
});

module.exports = router;