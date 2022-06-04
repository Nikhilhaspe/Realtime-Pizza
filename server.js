const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
app.use(expressLayout);

const PORT = process.env.PORT || 3000;

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

// Setting Template Engine
app.use(express.static('public'));
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

// ROUTES CALLING
require('./routes/web')(app);

app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
});