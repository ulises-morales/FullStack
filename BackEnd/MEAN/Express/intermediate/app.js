var express = require('express');

var app = express();

// root route
app.get("/", function(req, res){
  res.render("home.ejs");
});

// users route
app.get("/user/:name", function(req, res){
  var name = req.params.name;
  res.render("welcome.ejs", {user_name: name});
});


// app listener
app.listen(8000, function(){
  console.log("Listening in port 8000");
});
