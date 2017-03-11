var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// globally avaliable array of friends
var friends = ["friend1", "friend2", "friend3", "friend4"];

// home page
app.get("/", function(req, res){
  res.render("home");
});

// post route
app.post("/addfriend", function(req, res){
  console.log(req.body);
  var newFriend = req.body.newfriend;
  friends.push(newFriend);
  res.redirect("/friends");
});

// friends page
app.get("/friends", function(req, res){
  res.render("friends", {friends_list: friends});
});

// listening port
app.listen(8000, function(){
  console.log("Listening in port 8000");
});
