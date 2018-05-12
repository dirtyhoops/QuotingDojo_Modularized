var mongoose = require('mongoose');
var Quote = mongoose.model('Quote'); // We are retrieving this Schema from our Models, named 'Quote'

module.exports = {

index : function(req, res){
    res.render('index');
},
    
quotespost : function(req, res){ 
    console.log("POST DATA", req.body);
    var quote = new Quote({name: req.body.name, quote: req.body.quote});
    quote.save(function(err) {
        if(err) {
            console.log('something went wrong');
            res.redirect('/');
        } else { 
            console.log('successfully added a quote!');
            res.redirect('/quotes');
        }
    })
},

quotes : function(req,res){
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
    })
}

} //end of module.exports