console.log("Client: questionFactory");
//=========================================
//----------- QUESTIONs FACTORY -----------
//=========================================

appModule.factory("questionFactory", function($http){

  // define variables
  var factory = {};

  // getting question data from client/controller to here and sending it to routes in server
  factory.createQuestion = function (question, callback){
    console.log('question in factory: ', question);
    $http.post("/questions", question).then(function(returned_data){
      callback(returned_data.data);
    });
  };

  factory.getQuestions = function (callback){
    console.log('***************************');
    $http.get("/questions").then(function(returned_data){
      callback(returned_data.data);
    });
  };

  factory.getOneQuestion = function(id, callback){
    console.log('id of specific question in factory', id);
    $http.get('/questions/' + id.id).then(function(returned_data){
      callback(returned_data.data);
    });
  }


  return factory;
})
