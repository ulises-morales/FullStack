console.log("Client: One Question Controller");
//=========================================
//----- SPECIFIC QUESTIOn CONTROLLER ------
//=========================================

appModule.controller("oneQuestionController", ['$scope', 'userFactory', 'questionFactory', 'answerFactory', '$location', '$routeParams', function($scope, userFactory, questionFactory, answerFactory, $location, $routeParams){
  $scope.currentUser = null;
  $scope.answers = [];

  var getAnswers = function(){
    answerFactory.getAnswers($routeParams, function(data){
      $scope.answers = data;
    });
  }

  // check if the user is in session otherwise redirect to login
  userFactory.getUser(function(data){
    if(data.status === false){
      $location.url('/login');
    } else {
      $scope.currentUser = data;
    }
  });

  questionFactory.getOneQuestion($routeParams, function(data){
    console.log($routeParams);
    console.log("Data for one question", data);
    $scope.question = data;
    getAnswers();
  });

  $scope.like = function(index){
    $scope.liked = $scope.answers[index];
    answerFactory.like($scope.liked, function(data){
      getAnswers();
    });
  };

}]);
