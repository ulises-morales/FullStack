console.log("Welcome to the users controller");
//=========================================
//----------- USERS CONTROLLER ------------
//=========================================
var mongoose = require('mongoose'),
    User     = mongoose.model('User');


module.exports = (function(){
  return{

    login: function(req, res){
      User.findOne({name: req.body.name}, function(err, result){
        if (!result) {
          User.create(req.body, function(err, user){
            if(err){
              console.log(err);
              res.json(err);
            } else {
              req.session.user = user;
              req.session.save();
              // console.log("user in controller:", user);
              res.json(user);
            }
          });
        } else {
          if (err){
            console.log(err);
            res.json(err);
          } else {
            req.session.user = result;
            req.session.save();
            res.json(result);
          }
        }
      });
    },

    index: function(req, res){
      if (!req.session.user || req.session.user == null){
        res.json({status: false});
      } else {
        console.log("user in session", req.session.user);
        res.json(req.session.user);
      }
    },

    logout: function(req, res){
      req.session.destroy();
      res.redirect("/");
    },

  }

})();
