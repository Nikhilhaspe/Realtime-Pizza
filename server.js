require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const PORT = process.env.PORT || 3000;

// COOKIE STORAGE IN DATABASE OF THE SERVER
const MongoDbStore = require('connect-mongo');

// TELLING SERVER TO STORE JSON REQ DATA IN req.body
app.use(express.json());

// TELLING EXPRESS TO GET URL ENCODED DATA SENT VIA FORMS IN REQ
app.use(express.urlencoded({
    extended: false
}));

// MIDDLEWARES
app.use(flash());
app.use(expressLayout);

// DATABASE CONNECTION
const url = 'mongodb://localhost/pizzas';
mongoose.connect(url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to Pizzas :: MONGO-DB');
}).on('error', err => {
    console.log('Connection failed to Pizzas :: MONGO-DB');
});

// SESSION CONFIGURATION (MIDDLEWARE)
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
        mongoUrl: process.env.DATABASE_URL
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// PASSPORT MIDDLEWARE CONFIGURATION
const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

// GLOBAL MIDDLEWARES
// WE CANT ACCESS SESSION DIRECTLY IN THE LAYOUT FILE SO WE NEED TO HAVE GLOBAL MIDDLEWARES
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

// Setting Template Engine
app.use(express.static('public'));
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// ROUTES CALLING
require('./routes/web')(app);

app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
});