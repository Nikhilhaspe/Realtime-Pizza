const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Setting Template Engine
app.use(express.static(path.join(__dirname, '/resources/views')));
app.set('views', path.join(__dirname, '/resources/views'));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
});

app.get('/', (req, res) => {
    res.render('home.ejs');
});