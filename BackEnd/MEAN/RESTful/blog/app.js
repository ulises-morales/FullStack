const bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      express = require("express"),
      app = express();

// APP Config
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// create schema -- mongoose/MODEL CONFIG
let blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

// compile schema into model
let Blog = mongoose.model("Blog", blogSchema);

// -- RESTful Routes --
// Root route redirect to blogs route
app.get('/', function(req, res){
  res.redirect('/blogs');
});

// index route
app.get('/blogs', function(req, res){
  // go into Blog db and find all. Also pass errors and data
  Blog.find({}, function(err, posts){
    if(err){
      console.log("Error with posts");
    } else {
      res.render('index', {blogs: blogs});
    }
  });
});


// listen
app.listen(8000, function(){
  console.log("Listening in port 8000");
});
