console.log("Welcome to the questions controller");
//=========================================
//----------- QUESTIONS CONTROLLER ------------
//=========================================
var mongoose = require('mongoose'),
    Question     = mongoose.model('Question');


module.exports = (function(){
  return{

    // storing question in db
    createQ: function(req, res){
      var newQuestion = {
        _user: req.session.user,
        question: req.body.question,
        description: req.body.description
      };

      console.log("***newQuestion:", newQuestion);

      Question.create(newQuestion, function(err, question){
        if(err){
          console.log("controller question error:", err);
          res.json(err);
        } else {
          // console.log('this is new question in controller', question);
          res.json(question);
        }
      });
    },

    // Getting all questions from db to be displayed in front-end
    index: function(req, res){
      Question.find({}, function(err, questions){
        if(err){
          console.log("can't get all questions from db", err);
          res.json(err);
        } else {
          console.log(questions);
          res.json(questions);
        }
      });
    },

    // geting one question by id
    get: function(req, res){
      Question.findOne({_id: req.params.id}, function(err, question){
        if(err){
          console.log("Error getting the question");
          res.json(err);
        } else {
          res.json(question);
        }
      });
    },

  }
})();
