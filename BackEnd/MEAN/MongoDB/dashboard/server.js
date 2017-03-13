var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var path = require('path');
var app = express();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dashboard');

var DogSchema = new mongoose.Schema({
 name: {
   type: String,
   maxlength: 15,
   required : [true, 'name of the dog']
 },
 breed: {
   type: String,
   maxlength: 15,
   required : [true, 'dog breed']
 },
 age: {
   type: Number,
   min: [0, 'Dog cannot have negative age'],
   max: [25, 'Dogs cannot be that old'],
   required: [true, 'Dog needs an age'],
 },
}, {timestamps: true});

mongoose.model('Dog', DogSchema);
var Dog = mongoose.model('Dog');

// Use native promises
mongoose.Promise = global.Promise;

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));

// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

// -----Routes------ //
// Root Request
app.get('/', function(req, res){
  Dog.find({}, function (err, dogs) {
        if (!err) {
            console.log(dogs[1].name);
            console.log('successfully retrived users!');
            res.render('index', {dogs: dogs});
        }
        else {
            console.log("dogs not found");
            res.render('index');
        }
    });
});

app.get('/dogs/new', function (req, res) {
    console.log('make new dog');
    res.render('makeDog');
});

app.get('/dogs/:id', function (req, res) {
    Dog.findOne({_id: req.params.id}, function (err, dogs) {
        if (!err){
            console.log('this is the dog');
            res.render('dogs', {dogs: dogs});
        }
        else {
            console.log('no dogs found');
            res.render('dogs',{dogs: false});
        }
    });
});

app.get('/dogs/edit/:id', function (req, res) {
    var dogs = Dog.findOne({_id: req.params.id}, function (err, dogs) {
        if (!err) {
            console.log('updating dog');
            res.render('updateDog', {dogs: dogs});
        }
        else {
            res.render('updateDog');
        }
    });
});

// listening in port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
