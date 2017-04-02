console.log("Welcome to server routes");
//=========================================
//------------- SERVER ROUTES -------------
//=========================================


// REQUIRE CONTROLLERS
var users     = require('../controllers/users.js'),
    questions = require('../controllers/questions.js'),
    answers   = require('../controllers/answers.js');


// CREATE ROUTES
module.exports = function(app){

  // login route
  app.post('/login', function(req, res){
    users.login(req, res);
  });

  // check if user in session
  app.get('/index', function(req, res){
    users.index(req, res);
  });

  // logout
  app.get("/logout", function(req, res){
    users.logout(req, res);
  });

  // get post data from questions form
  app.post('/questions', function(req, res){
    questions.createQ(req, res);
  });

  // get all questions data
  app.get('/questions', function(req, res){
    questions.index(req, res);
  });

  // get One question
  app.get('/questions/:id', function(req, res){
    questions.get(req, res);
  });

  // post data from answer form
  app.post('/answers', function(req, res){
    answers.createA(req, res);
  });

  // get one answer
  app.get('/answers/:id', function(req, res){
    answers.index(req, res);
  });

  // post likes
  app.post('/answers/like', function(req, res){
    answers.like(req, res);
  });


}
