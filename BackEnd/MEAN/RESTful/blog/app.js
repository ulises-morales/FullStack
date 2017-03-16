const bodyParser = require("body-parser"),
      methodOverride = require("method-override"),
      expressSanitizer = require("express-sanitizer"),
      mongoose = require("mongoose"),
      express = require("express"),
      app = express();

// APP Config
mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

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

// INDEX ROUTE
app.get('/blogs', function(req, res){
  // go into Blog db and find all. Also pass errors and data
  Blog.find({}, function(err, blogs){
    if(err){
      console.log("Error with posts");
    } else {
      res.render('index', {blogs: blogs});
    }
  });
});

// NEW ROUTE
app.get('/blogs/new', function(req, res){
  res.render('new');
});

// CREATE ROUTE
app.post('/blogs', function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  // create blog
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      console.log("Oops, something went wrong");
      res.render('new');
    } else {
      // then, redirect to index
      res.redirect('/blogs');
    }
  });
});

// SHOW ROUTE
app.get('/blogs/:id', function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      console.log("Not able to show this post");
      res.redirect('/blogs');
    } else {
      res.render('show', {blog: foundBlog})
    }
  });
});

// EDIT ROUTE
app.get('/blogs/:id/edit', function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog) {
    if(err){
      res.redirect('/blogs');
    } else {
      res.render('edit', {blog: foundBlog});
    }
  });
});

// UPDATE ROUTE
app.put('/blogs/:id', function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  // Blog.findByIdAndUpdate(id, newData, callback)
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
    if(err){
      res.redirect('/blogs/' + req.params.id);
    } else {
      res.redirect()
    }
  });
});

// DELETE ROUTE
app.delete('/blogs/:id', function(req, res){
  // destroy blogs
  Blog.findByIdAndRemove(req.params.id, function(err){
    if (err){
      console.log("Unable to delete");
      res.redirect('/blogs');
    } else {
      res.redirect('/blogs');
    }
  })
  // redirect somewhere
});

// listen
app.listen(8000, function(){
  console.log("Listening in port 8000");
});
