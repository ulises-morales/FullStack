console.log("Welcome to the server side");
//=========================================
//---------------- SETUP ------------------
//=========================================
var express  = require('express'),
    path     = require('path'),
    mongoose = require('mongoose'),
    bp       = require('body-parser'),
    session  = require('express-session'),

    app      = express();


// STATIC FILES
app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')));

app.use(bp.json());

// session
app.use(session({
  secret: "This is the secret key",
  resave: false,
  saveUninitialized: true,
}));


//---------------- DATABASE -----------------
require('./server/config/mongoose.js');

//---------------- ROUTES -------------------
require('./server/config/routes.js')(app);


// LISTENING IN PORT 8000
app.listen(8000, function(){
  console.log("Listening in port 8000");
})
