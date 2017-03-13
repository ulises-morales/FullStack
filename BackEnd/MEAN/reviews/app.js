var express = require ("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
// set ejs
app.set("view engine", "ejs");

var campground = [
  {name: "Salmon Creek", image: "http://images.nationalgeographic.com/wpf/media-live/photos/000/367/cache/banff-lake-morraine_36732_600x450.jpg"},
  {name: "Granit Hill", image: ""},
  {name: "Mount Goat's Rest", image: ""},
]

// root route
app.get("/", function(req, res){
  res.render("welcome");
});

// campgrounds root
app.get("/campgrounds", function(req, res){
  // var campground = [
  //   {name: "Salmon Creek", image: "http://images.nationalgeographic.com/wpf/media-live/photos/000/367/cache/banff-lake-morraine_36732_600x450.jpg"},
  //   {name: "Granit Hill", image: ""},
  //   {name: "Mount Goat's Rest", image: ""},
  // ]
  res.render("campground", {campInfo: campground});
});

// post route
app.post("/campgrounds", function(req, res){
  //get data from form and add to campground array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campground.push(newCampground);
  //redirect back to campground
  res.redirect("/campgrounds");
  // res.send("You reached the post route");
});

app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");
});


// Listening in port 80000
app.listen(8000, function(){
  console.log("Listening in port 8000");
});
