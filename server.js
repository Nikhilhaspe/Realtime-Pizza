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

// ROUTES CALLING
require('./routes/web')(app);

app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
});