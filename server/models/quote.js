var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String
})

mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'Quote'

