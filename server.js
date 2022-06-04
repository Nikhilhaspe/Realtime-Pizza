const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
app.use(expressLayout);

const PORT = process.env.PORT || 3000;

// Setting Template Engine
app.use(express.static('public'));
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// ROUTES
app.get('/', (req, res) => {
    res.render('home.ejs');
});

app.get('/cart', (req, res) => {
    res.render('customers/cart.ejs');
});

app.get('/login', (req, res) => {
    res.render('auth/login.ejs');
});

app.get('/register', (req, res) => {
    res.render('auth/register.ejs');
});

app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
}) 