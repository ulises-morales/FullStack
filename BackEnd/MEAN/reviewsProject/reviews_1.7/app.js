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

// requiring routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

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

app.use("/",indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

// Listening in port 80000
app.listen(8000, function(){
  console.log("Listening in port 8000");
});
