console.log("Client: Dashboard Controller");
//=========================================
//---------- DASHBOARD CONTROLLER ---------
//=========================================

appModule.controller("dashboardController", ['$scope', 'userFactory', 'questionFactory', '$location', function($scope, userFactory, questionFactory, $location){
  $scope.currentUser = null;
  $scope.questions = [];

  // check if the user is in session otherwise redirect to login
  userFactory.getUser(function(data){
    if(data.status === false){
      $location.url('/login');
    } else {
      $scope.currentUser = data;
    }
  });

  questionFactory.getQuestions(function(data){
    console.log("get questions controller route");
    $scope.questions = data;
  });

}]);
