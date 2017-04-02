console.log("Client: userFactory");
//=========================================
//------------- USER FACTORY --------------
//=========================================

appModule.factory("userFactory", function($http){

  // define variables
  var factory = {};

  // get data from users controller
  factory.login = function(user, callback){
    console.log('User in factory: ', user);
    // send to routes in server
    $http.post('/login', user).then(function(returned_data){
      callback(returned_data.data);
      console.log(returned_data.data);
    });
  };

  factory.getUser = function(callback){
    $http.get('/index').then(function(returned_data){
      callback(returned_data.data);
    });
  };

  return factory;
})
