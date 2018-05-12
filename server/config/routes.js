var mongoose = require('mongoose');
var Quote = mongoose.model('Quote'); // We are retrieving this Schema from our Models, named 'Quote'

var quotes = require('../controllers/quotes.js')
module.exports = function(app) {
    app.get('/', function(req, res) {
        quotes.index(req, res);
    })

    // Add Quotes Request 
    app.post('/quotes', function(req, res) {
        quotes.quotespost(req,res);
    })

    // get route for quotes and it displays the quotes
    app.get('/quotes', function(req, res) {
        quotes.quotes(req, res);
    })
}