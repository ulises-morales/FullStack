const express     = require ("express"),
    bodyParser    = require("body-parser"),
    app           = express(),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground    = require('./models/campground'),
    Comment       = require('./models/comment'),
    User          = require("./models/user"),
    seedDB        = require("./seeds");


// connect mongoose
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
// set ejs
app.set("view engine", "ejs");
// serve static files
app.use(express.static(__dirname + "/public"));

// seed DB
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "This is the secret key",
  resave: false,
  saveUninitialized: false,
}));

// use passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//---
// MIDDLEWARE
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

// root route
app.get("/", function(req, res){
  res.render("welcome");
});

// campgrounds root
app.get("/campgrounds", function(req, res){
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
  res.render("campgrounds/new");
});

// shows info for specific campground
app.get("/campgrounds/:id", function(req, res){
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


// =============================
// COMMENTS ROUTES
// =============================
// display form for comments
app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res){
  // find campground by id
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
        res.render('comments/new', {campground: campground});
    }
  })
});

// post route for comments route
app.post('/campground/:id/comments', isLoggedIn, function(req, res){
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

// ====================
// AUTH ROUTES
// ====================

// show register form
app.get("/register", function(req, res){
  res.render("register");
});

// signup logic
app.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds");
    });
  });
});

// show logic form
app.get("/login", function(req, res){
  res.render("login");
});

// login logic
app.post("/login", passport.authenticate("local",
{
  successRedirect: "/campgrounds",
  failureRedirect: "/login",
}), function(req, res){

});

// logout route
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/campgrounds");
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

// Listening in port 80000
app.listen(8000, function(){
  console.log("Listening in port 8000");
});
