const keys = require('./config/keys')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')

const express = require('express')
const cookieSession = require('cookie-session')

const cookie = process.env.CKE || require('./config/keys').session.cookieKey
const mongo = process.env.MNG || require('./config/keys').mongodb.dbURI
const PORT = process.env.PORT || 3000
const app = express()

const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const apiRoutes = require('./routes/api-routes')
const reply = require('./routes/comment-reply')

const mongoose = require('mongoose')

//set static
app.use(express.static('static'))
    // set view engine
app.set('view engine', 'ejs')

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize())
app.use(passport.session())


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

// set up routes
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)
app.use('/api', apiRoutes)
app.use('/testing', reply)

// create home route
app.get('/', (req, res) => {
        res.render('home', { user: req.user })
    })
    //route for testing GUI
app.get('/test', (req, res) => {
    res.render('api-test', { user: req.user })
})


app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
})




// const passport = require('passport')
// const passportSetup = require('./config/passport-setup')

// const express = require('express')
// const cookieSession = require('cookie-session')
// const cookie = process.env.CKE || require('./config/keys').session.cookieKey

// const mongoose = require('mongoose')
// const mongo = process.env.MNG || require('./config/keys').mongodb.dbURI

// const PORT = process.env.PORT || 3000
// const app = express()

// const authRoutes = require('./routes/auth-routes')
// const profileRoutes = require('./routes/profile-routes')
// const apiRoutes = require('./routes/api-routes')
// const reply = require('./routes/comment-reply')

// //set static
// app.use(express.static('static'))

// // set up routes
// app.use('/auth', authRoutes)
// app.use('/profile', profileRoutes)
// app.use('/api', apiRoutes)
// app.use('/testing', reply)

// // set view engine
// app.set('view engine', 'ejs')

// // set up session cookies
// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [cookie]
// }))

// // initialize passport
// app.use(passport.initialize())
// app.use(passport.session())

// // connect to mongodb
// mongoose.connect(mongo, () => {
//     console.log('connected to mongodb');
// })

// // create home route
// app.get('/', (req, res) => {
//     res.render('home', { user: req.user })
// })

// //route for testing GUI
// app.get('/test', (req, res) => {
//     res.render('api-test', { user: req.user })
// })

// app.listen(3000, () => {
//     console.log('app now listening for requests on port 3000');
// })