var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var path = require('path');
app.use(express.static(path.join(__dirname, './static')));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/basic_mongoose');

var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String
})

mongoose.model('Quote', QuoteSchema); // We are setting this Schema in our Models as 'Quote'
var Quote = mongoose.model('Quote') // We are retrieving this Schema from our Models, named 'Quote'

// Use native promises
mongoose.Promise = global.Promise;


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    res.render('index');
})

// Add Quotes Request 
app.post('/quotes', function(req, res) {
    console.log("POST DATA", req.body);
    // create a new Quote with the name and age corresponding to those from req.body
    var quote = new Quote({name: req.body.name, quote: req.body.quote});
    // Try to save that new  quote to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    quote.save(function(err) {
      // if there is an error console.log that something went wrong!
      if(err) {
        console.log('something went wrong');
      } else { // else console.log that we did well and then redirect to the root route
        console.log('successfully added a quote!');
        res.redirect('/');
      }
    })
  })

// get route for quotes and it displays the quotes
app.get('/quotes', function(req, res) {
    Quote.find({}, function(err, quotes) {
        if(err) {
            console.log(err);
            return redirect('/');
        }
        else {
            var myquotes = [];
            for(i=0; i<quotes.length; i++) {
                myquotes.push(quotes[i]);
            }
            console.log(myquotes);
            res.render('result', {quotes: myquotes});
        }
    });
});


// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})