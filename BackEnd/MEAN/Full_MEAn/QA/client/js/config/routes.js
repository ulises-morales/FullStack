// =====================
// CLIENT SIDE ROUTING
// =====================

appModule.config(function ($routeProvider){
  $routeProvider
  .when("/login", {
    templateUrl: "static/partials/login.html"
  })
  .when("/dashboard", {
    templateUrl: "static/partials/dashboard.html"
  })
  .when("/new_question", {
    templateUrl: "static/partials/new_question.html"
  })
  .when("/question/:id", {
    templateUrl: "static/partials/question.html"
  })
  .when("/question/:id/answer", {
    templateUrl: "static/partials/answer.html"
  })
  .otherwise({
    redirectTo: "/login"
  })
})
