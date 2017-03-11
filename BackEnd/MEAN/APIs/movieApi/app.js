var express = require("express");
var request = require("request");

var app = express();

// activating ejs
app.set("view engine", "ejs");

// root route
app.get("/", function(req, res){
  res.render("search")
});

// using API
app.get("/results", function(req, res){
  var query = req.query.search;
  var url = `http://www.omdbapi.com/?s=${query}`
  request(url, function(error, response, body){
    if (!error && response.statusCode == 200){
      var parsedData = JSON.parse(body);
      console.log(parsedData["Search"][0]["Title"]);
      res.render("results", {data: parsedData});
    }
  });

});

app.listen(8000, function(){
  console.log("Listening in port 8000");
});
