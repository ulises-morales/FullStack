const express = require ("express"),
    bodyParser = require("body-parser"),
    app = express(),
    mongoose = require("mongoose"),
    Campground = require('./models/campground'),
    seedDB = require("./seeds");

// seed DB
seedDB();

// connect mongoose
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
// set ejs
app.set("view engine", "ejs");


// root route
app.get("/", function(req, res){
  res.render("welcome");
});

// campgrounds root
app.get("/campgrounds", function(req, res){
  // get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("index", {campInfo: allCampgrounds});
    }
  });
});

// post route
app.post("/campgrounds", function(req, res){
  //get data from form and add to campground array
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name: name, image: image, description: description};
  // Create a new campground and save to db
  Campground.create(newCampground, function(err, newlyCreated){
    if(err){
      console.log(err);
    } else {
      //redirect back to campground
      res.redirect("/campgrounds");
    }
  });
});

// shows form
app.get("/campgrounds/new", function(req, res){
  res.render("new.ejs");
});

// shows info for specific campground
app.get("/campgrounds/:id", function(req, res){
  // find campground with provided ID
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log("Did not find id");
    } else {
      // render show template with the campground
      res.render("show", {campground: foundCampground});
    }
  });
});



// Listening in port 80000
app.listen(8000, function(){
  console.log("Listening in port 8000");
});
