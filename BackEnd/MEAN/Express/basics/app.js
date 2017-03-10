var express = require('express'); // import express dependency
var app = express(); // activate express

// create root route and display message
app.get('/', function(req, res){
  res.send("Hi there, welcome to my first express app");
});

// ------- using if staments-------- //

// create speak route
// app.get('/speak/:animal', function(req, res){
//   var animal = req.params.animal; // grab the name of the animal from the url
//   var sound = "";
//   if (animal === "pig"){
//     sound = "Oink";
//     console.log(sound);
//   }
//   else if
//   (animal === "cow"){
//     sound = "moo";
//   }
//   // res.send("This is the speak route");
//   res.send(`The ${animal} says ${sound}`);
//   // res.send('The' + animal + 'says' + sound);
//   console.log('The' + animal + 'says' + sound);
// });

// Speak route
app.get('/speak/:animal', function(req, res){
  var sounds = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof Woof!",
    cat: "Meow",
    goldfish: "...",
  }

  var animal = req.params.animal.toLowerCase();
  var sound = sounds[animal];
  res.send(`The ${animal} says ${sound}`);
});

// repeat route
app.get('/repeat/:message/:times', function(req, res){
  var message = req.params.message;
  var times = Number(req.params.times);

  var result = "";
  for (var i = 0; i < times; i++){
    result += message + " ";
  }
  // res.send(`message: ${message} times: ${times}`);
  res.send(`${result}`);
});

// catch all route
app.get('*', function(req, res){
  res.send("404, Page not found")
});


// tell app what port to listen on
app.listen(8000, function(){
  console.log("Using port 8000");
});
