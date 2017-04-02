console.log("Client: answerFactory");
//=========================================
//----------- ANSWER FACTORY --------------
//=========================================

appModule.factory("answerFactory", function($http){

  // define variables
  var factory = {};

  factory.answerQuestion = function(answer, callback){
    console.log('Answer in factory: ', answer);
    $http.post('/answers', answer).then(function(returned_data){
      callback(returned_data.data);
      console.log(returned_data.data);
    });
  };

  factory.getAnswers = function(id, callback){
    $http.get('/answers/' + id.id).then(function(returned_data){
      callback(returned_data.data);
    });
  };

  factory.like = function(liked, callback){
    $http.post('/answers/like', liked).then(function(returned_data){
      callback(returned_data.data);
    });
  }

  return factory;
})
