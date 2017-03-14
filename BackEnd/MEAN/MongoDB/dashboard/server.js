var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var path = require('path');
var app = express();

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));

// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

var mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;

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


// -----Routes------ //
// Root Request
// display dogs
app.get('/', function(req, res){
  Dog.find({}, function (err, dogs) {
    if (!err) {
      console.log(dogs.name);
      console.log('successfully retrived dogs!');
      res.render('index', {dogs: dogs});
    }
    else {
      console.log("dogs not found");
      res.render('index');
    }
  });
});

// display form to create dog
app.get('/dogs/new', function(req, res){
  console.log("Made it to create dog route");
  res.render('makeDog');
});

// post route for the dog creation form
app.post('/dogs', function(req, res) {
  console.log("POST DATA", req.body);
  var dog = new Dog({name: req.body.name, breed: req.body.breed, age: req.body.age});
  dog.save(function (err) {
    if (!err) {
      console.log('Dog has been added!');
      res.redirect('/');
    }
    else {
      console.log('Something went wrong');
      res.render('makeDog', {errors: dog.errors});
    }
  });
});

// display specific dog's info
app.get('/dogs/:id', function (req, res) {
    Dog.findOne({_id: req.params.id}, function (err, dogs) {
        if (!err){
            console.log('your dog');
            res.render('dogs', {dogs: dogs});
        }
        else {
            console.log('no dogs');

            res.render('dogs',{dogs: false});
        }
    });
});


// update route
app.get('/dogs/edit/:id', function (req, res) {
  var dogs = Dog.findOne({_id: req.params.id}, function (err, dogs) {
  if (!err) {
    console.log('ready to update dog');
    res.render('updateDog', {dogs: dogs});
  }
  else {
    console.log("unable to update");
    res.render('updateDog', {dogs: false});
    }
  });
});

// update post route
app.post('/dogs/:id', function(req, res){
  console.log("*************",req.params.id);
  Dog.update({_id:req.params.id}, {name:req.body.name, breed: req.body.breed, age:req.body.age}, {runValidators: true},function (err, dogs) {
    if (!err){
      console.log("Got to the update post route");
      console.log("POST DATA", req.body);
      res.redirect('/');
    }
    else {
      console.log('unable to update');
      console.log(Dog.errors);
      res.render('updateDog', {errors: dog.errors, dogs: false});
    }
  });
});

// Delete post route
app.post('/dogs/destroy/:id', function(req, res){
  Dog.remove({_id: req.params.id}, function (err, dogs) {
    if (!err){
      console.log("Got to the delete route");
      console.log("POST DATA", req.body);
      res.redirect('/');
    }
    else {
      console.log("dog hasn't been deleted");
      res.redirect('/');
    }
  });
});


// listening in port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
