var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  let user = {
    name: req.params.name,
    id: req.params.id
  }
  currentUser = user;// res.render('index', { user: user })
  console.log('I think you are ', currentUser.name);
  res.redirect(`http://localhost:5000/`);
});

router.get('/:name/:id', (req, res) => {
  let user = {
          name: req.params.name,
          id: req.params.id
      }
  currentUser = user;// res.render('index', { user: user })
  console.log('I think you are ', currentUser.name);
  res.redirect(`http://localhost:5000/`);
});

module.exports = router;
