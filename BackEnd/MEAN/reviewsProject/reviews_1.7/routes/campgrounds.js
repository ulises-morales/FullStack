// ====================
// CAMPGROUND ROUTES
// ====================
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// campgrounds INDEX route
router.get("/", function(req, res){
  console.log(req.user);
  // get all campgrounds from db
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/index", {campInfo: allCampgrounds});
    }
  });
});

// CREATE post route
router.post("/", function(req, res){
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

// form for NEW campground
router.get("/new", function(req, res){
  res.render("campgrounds/new");
});

// shows info for specific campground
router.get("/:id", function(req, res){
  // find campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log("Did not find id");
    } else {
      // render show template with the campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });
});

module.exports = router;
