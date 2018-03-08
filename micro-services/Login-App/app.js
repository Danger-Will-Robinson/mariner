const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
<<<<<<< HEAD
//const passportSetup = require('./config/passport-setup');
=======
const apiRoutes = require('./routes/api-routes');
const passportSetup = require('./config/passport-setup');
>>>>>>> 974a42ce2ebb8fe9e83fc3de5652155cceed38b5
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();
//set static
app.use(express.static('static'))
    // set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/api', apiRoutes);


// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});
app.get('/test', (req, res) => {
        res.render('api-test', { user: false })
    })
    // app.get('/youtube', (req, res) => res.json(req))
app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});