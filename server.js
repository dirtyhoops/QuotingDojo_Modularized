var express = require('express'),
    bodyParser = require('body-parser'), 
    path = require('path'),
    app = express(),
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './client/static')));
mongoose.connect('mongodb://localhost/basic_mongoose');

var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String
})

mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'Quote'

// Use native promises
mongoose.Promise = global.Promise;

app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/routes.js')(app)

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})