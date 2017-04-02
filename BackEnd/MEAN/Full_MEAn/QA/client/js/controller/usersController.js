console.log("Client: usersController");
//=========================================
//------------ USERS CONTROLLER -----------
//=========================================

appModule.controller("usersController", ['$scope', 'userFactory', '$location', function($scope, userFactory, $location){
  $scope.user = {};


  $scope.login = function(){
    // check if empty input field
    if(!$scope.user.name){
      $scope.warning = "Please enter your name";
    } else {
      //send info to factory and redirect
      userFactory.login($scope.user, function(returnedData){
        $location.url("/dashboard");
      });
    }
    $scope.user = null;
  };

}]);
