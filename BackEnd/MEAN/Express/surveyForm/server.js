// require express
var express = require("express");
// path module
var path = require("path");
var bodyParser = require('body-parser');
// create the express app
var app = express();

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./static")));

// ejs and views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// routing file
var route = require('./routes/index.js')(app);

// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});
