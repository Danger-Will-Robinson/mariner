var express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const db = require('../database/preferences')

const PORT = process.env.PORT || 5000;



const axios = require('axios');
const queryController = require('../controllers/queryController');
var currentUser;
//sample data routes
var ALLVIDEOS = require('../data/youTubeAllVideoResponse');


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/reactTest', express.static(path.join(__dirname, 'client/dist')));


// app.use('/', index);
app.use('/users', users);
app.use('/API/', API);
app.use('/query/', query);

app.get('/', (req, res) => {
=======
router.get('/', (req, res) => {
>>>>>>> f1a2bac1113c457cf0d028216bf06bb37d1290ae
    console.log('redir new user')
    res.redirect('http://localhost:3000')
})

<<<<<<< HEAD
// app.get('/:name/:id', (req, res) => {
//     let user = {
//             name: req.params.name,
//             id: req.params.id
//         }
//         // res.render('index', { user: user })
//     res.redirect(`http://localhost:5001/reactTest/${user.name}/${user.id}`)
// });
=======
router.get('/:name/:id', (req, res) => {
    let user = {
            name: req.params.name,
            id: req.params.id
        }
    currentUser = user;// res.render('index', { user: user })
    console.log('I think you are ', currentUser.name);
    res.redirect(`http://localhost:5000/reactTest/`);
});
>>>>>>> f1a2bac1113c457cf0d028216bf06bb37d1290ae

router.post('/query/', queryController.queryCommentDB);

router.get('/getUser', (req, res) => {
    // send user name to front end
    if (currentUser) {
        res.json(currentUser.name);
    } else {
        res.redirect('http://localhost:3000');
    }
});

router.get('/getUserToken:id', function(req, res, next) {
    //reach out to joe's oauth app
    //return user token string
    //on port ;;4444
})
router.get('/allvideos/:token', function(req, res, next) {
    //reach out to videos db app.
    //on port 4445
    //sends back json of needed info
});

router.get('/videodatabase/addVideo', function(req, res, next) {
    let videoData = req.param;
    db.query(`INSERT INTO users (username, google_auth) VALUES ('Sonic', 'A8BC0293DD')`, function cb(err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log('Yay it worked');
        }
    });
    res.status(err.status || 500);
    res.end();
});

module.exports = router;