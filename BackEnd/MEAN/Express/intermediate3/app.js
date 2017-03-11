var express = require('express');
var app = express();

// use custome assets
app.use(express.static("stylesheets"));
// setting ejs
app.set("view engine", "ejs");

// root route
app.get("/", function(req, res){
  res.render("home");
});

// users route
app.get("/user/:name", function(req, res){
  var name = req.params.name;
  res.render("welcome", {user_name: name});
});


// posts route
app.get("/posts", function(req, res){
  var posts = [
    {title: "This is the first post", author: "Annonymous"},
    {title: "This is the second post", author: "John"},
    {title: "This is the third post", author: "Mike"},
  ];
  res.render("posts",{posts: posts});
});


// app listener
app.listen(8000, function(){
  console.log("Listening in port 8000");
});
