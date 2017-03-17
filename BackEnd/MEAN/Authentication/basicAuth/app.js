var   express               = require ("express"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      bodyParser            = require("body-parser"),
      User                  = require("./models/user"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      app = express();

// connect mongoose
mongoose.connect("mongodb://localhost/basic_auth");

// body parser
app.use(bodyParser.urlencoded({extended: true}));

// session
app.use(require("express-session")({
  secret: "This is the secret key",
  resave: false,
  saveUnitialized: false,
}));

// set ejs
app.set("view engine", "ejs");

// use passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ======================
// ROUTES
// ======================

// index route
app.get("/", function(req, res){
  res.render("home");
});

// secret route
app.get("/secret", isLoggedIn, function(req, res){
  res.render("secret");
});

//-- AUTH ROUTES

//-------------------
// REGISTER ROUTES
//-------------------
// show register form
app.get("/register", function(req, res){
  res.render("register");
});

// form submitted
app.post("/register", function(req, res){
  req.body.username
  req.body.password
  User.register(new User({username:req.body.username}), req.body.password, function(err, user){
    if (err){
      console.log(err);
      return res.renser("register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("secret");
      });
    }
  });
});

//-------------------
// LOGIN ROUTES
//-------------------
// show login form
app.get("/login", function(req, res){
  res.render("login");
});

// login logic
app.post("/login", passport.authenticate("local",{
  successRedirect: "/secret",
  failureRedirect: "/login",
}), function(req, res){

});

//-------------------
// LOGOUT ROUTES
//-------------------
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

//-------------------
// MIDDLEWAER
//-------------------
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

//listen
app.listen(8000, function(){
  console.log("Listening in port 8000");
});
