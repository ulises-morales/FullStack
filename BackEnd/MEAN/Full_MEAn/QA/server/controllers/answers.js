console.log("Welcome to the answers controller");
//=========================================
//--------- ANSWERS CONTROLLER ------------
//=========================================
var mongoose = require('mongoose'),
    Answer   = mongoose.model('Answer'),
    Question = mongoose.model('Question');


module.exports = (function(){
  return{

    // storing question in db
    createA: function(req, res){

      // send everything in one variable
      var newAnswer = {
        _user: req.session.user,
        _question: req.body.question,
        answer: req.body.answer,
        details: req.body.details
      };
      console.log(newAnswer);

      Answer.create(newAnswer, function(err, answer){
        if(err){
          console.log("controller answer error:", err);
          res.json(err);
        } else {
          // attach answer to question by id
          Question.findOne({_id: answer._question}, function(err, question){
            console.log("id of answer._question", answer._question);
            if(err){
              console.log("Trouble linking answer to question");
              res.json(err);
            } else {
              // answers counter
              console.log('number of answers', question.answers);
              question.answers += 1;
              question.save();
              res.json(answer);

            }
          });
        }
      });
    },

    // Getting all answers from db to be displayed in front-end
    index: function(req, res){
      // sort must be an array of arrays [[]]
      // populate exec 2 reference points
      //------------- Answer.find({_question: req.params.id}).populate('_user _question').exec(function(err, answers){
      Answer.find({_question: req.params.id}).sort([['likes', 'descending']]).populate('_user _question').exec(function(err, answers){
        if(err){
          console.log("err find this answers");
          res.json(err);
        } else {
          res.json(answers);
        }
      });
    },

    // get likes data
    like: function(req, res){
      Answer.findOne({_id: req.body._id}, function(err, answer){
        if(err){
          console.log("Error getting the answer by id");
          res.json(err);
        } else {
          // likes counter
          answer.likes += 1;
          answer.save();
          res.json(answer);
        }
      });
    },

  }
})();
