var app = angular.module('shouldyoufollow', []);

function MainCtrl($scope, $http) {
  $scope.hello = "hello world";
  $scope.screen_name = "oprah";

  $http.get("api.php?screen_name=" + $scope.screen_name).success(function(data) {
    $scope.data = data;

    // Might want to do $.ajaxSetup({cache: true});
    $.getScript("//platform.twitter.com/widgets.js");
  });  
}

app.controller("MainCtrl", MainCtrl);
