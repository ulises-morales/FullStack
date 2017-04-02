console.log("Client: answersController");
//=========================================
//------------ ANSWERS CONTROLLER ---------
//=========================================

appModule.controller("answersController", ['$scope', 'userFactory', 'questionFactory', 'answerFactory', '$location', '$routeParams', function($scope, userFactory, questionFactory, answerFactory, $location, $routeParams){
  $scope.currentUser = null;

  // check if the user is in session otherwise redirect to login
  userFactory.getUser(function(data){
    if(data.status === false){
      $location.url('/login');
    } else {
      $scope.currentUser = data;
    }
  });

  questionFactory.getOneQuestion($routeParams, function(data){
    console.log("answers controller test");
    $scope.question = data;
  });

  $scope.answerQuestion = function(){
    if(!$scope.answer){
      $scope.warning = "Please type an answer. Your answer must be at least 10 characters long";
    } else {
      $scope.answer.question = $scope.question;
      answerFactory.answerQuestion($scope.answer, function(data){
        if (data.errors){
          console.log("cant summit answer to controller", data.errors);
        } else {
          console.log("succesfully summited answer to controller", data);
          $location.url("/dashboard");
        }
      });
    }
    $scope.answerQuestion = null;
  };


}]);
