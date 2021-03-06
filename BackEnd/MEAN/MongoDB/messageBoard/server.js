var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var path = require('path');
var app = express();

// Integrate body-parser with the App
app.use(bodyParser.urlencoded({ extended: true }));
// Setting Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));

// Setting Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting View Engine set to EJS
app.set('view engine', 'ejs');

var mongoose = require('mongoose');

// Use native promises
mongoose.Promise = global.Promise;
// stablish database
mongoose.connect('mongodb://localhost/message_board_1');

// Define Schema variable
var Schema = mongoose.Schema;
// Define Post Schema
var PostSchema = new mongoose.Schema({
 name: {
   type: String,
   maxlength: 25,
   required : [true, 'name of user']
 },
 message: {
   type: String,
   maxlength: 500,
   required : [true, 'post message']
 },
 _comment: [{
   type: Schema.Types.ObjectId,
   ref: 'Comment'}]
}, {timestamps: true});

// Define Comment Schema
var CommentSchema = new mongoose.Schema({
 _post: {
   type: Schema.Types.ObjectId,
   ref: 'Post'
 },
 name: {
   type: String,
   maxlength: 25,
   required: true,
 },
  comment: {
    type: String,
    maxlength: 500,
    required: [true, "Comment is required"],
  }
}, {timestamp: true });

// set models by passing them their respective Schemas
mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);
// store models in variables
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

// Display posts and comments routes
app.get('/', function(req, res){
  Post.find({}).populate('_comment').exec(function(err, posts){
    Comment.find({}, function (err, comments){
      if (!err) {
        res.render('index', {posts: posts});
        console.log("This is a post");
       }
       else {
         res.render('index', {posts: false});
       }
     });
   });
});

//

// Post Route for creating a Post
app.post('/posts', function(req, res){
  console.log("POST DATA", req.body);
  var post = new Post({name: req.body.name, message: req.body.message});
    post.save(function (err) {
    if (!err) {
      console.log('Post has been added!');
      res.redirect('/');
    }
    else {
      console.log('Something went wrong');
      res.render('index', {errors: post.errors});
    }
  });
});


// Post route for creating comment
app.post("/comment/:id", function(req, res){
	var post_id = req.params.id;
	Post.findOne({_id: post_id}, function(err, post){
		var newComment = new Comment({name: req.body.c_name, comment: req.body.comment});
		newComment._post = post._id;
    console.log(newComment);
		Post.update({_id: post._id}, {$push: {"_comment": newComment}}, function(err){

		});
		newComment.save(function(err){
			if(err){
				console.log(err);
				res.render('index', {errors: newComment.errors});
			} else {
				console.log("comment added");
				res.redirect("/");
			}
		});
	});
});



// listening in port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
});
