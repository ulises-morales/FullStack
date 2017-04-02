console.log("Client: Questions Controller");
//=========================================
//---------- QUESTIONS CONTROLLER ---------
//=========================================

appModule.controller("questionsController", ['$scope', 'userFactory', 'questionFactory', '$location', function($scope, userFactory, questionFactory, $location){
  $scope.currentUser = null;

  // check if the user is in session otherwise redirect to login
  userFactory.getUser(function(returnedData){
    if(returnedData.status === false){
      $location.url('/login');
    } else {
      $scope.currentUser = returnedData;
    }
  });

  // getting data from the question form
  $scope.createQuestion = function(){
    if (!$scope.question){
      $scope.warning = "Please type a question. Your question must be at least 5 characters long";
    } else {
      questionFactory.createQuestion($scope.question, function(returnedData){
        if(returnedData.errors){
          $scope.errors = returnedData.errors;
          console.log($scope.errors);
        } else {
          console.log('question data in controller' , returnedData);
          $location.url("/dashboard");
        }
      });
    }
    // clear the form
    $scope.createQuestion = null;
  }

}]);
