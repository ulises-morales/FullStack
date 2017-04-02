// =============================
// COMMENTS ROUTES
// =============================
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// Displays form for NEW comments
router.get('/new', isLoggedIn, function(req, res){
  // find campground by id
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
        res.render('comments/new', {campground: campground});
    }
  })
});

// Post route for NEW comments form
router.post('/', isLoggedIn, function(req, res){
  // lookup campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect('/campgrounds')
    } else {
      // create new comment
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
          // connect new comment to campground
          campground.comments.push(comment);
          campground.save();
          // redirect to camground show page
          res.redirect('/camground/'+ camground._id);
        }
      });
    }
  });
});

//========
// MIDDLEWARE
//========
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
