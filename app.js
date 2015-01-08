var app = angular.module('shouldyoufollow', []);

function MainCtrl($scope, $http) {
  $scope.submitSnForm = function() {
    $http.get("api.php?screen_name=" + $scope.screenName).success(function(data) {
      console.log(data);
      $scope.tweets = data;
      $.getScript("//platform.twitter.com/widgets.js");
    });  
  };  
}

app.controller("MainCtrl", MainCtrl);
