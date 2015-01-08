var app = angular.module('shouldyoufollow', []);

function MainCtrl($scope, $http) {
  $scope.submitSnForm = function() {
    $http.get("api.php?screen_name=" + $scope.screenName).success(function(data) {
      console.log(data);
      $scope.tweets = data;
      $scope.iterator = 0;

      for(var key in $scope.tweets) {
        $scope.tweets[key].key = key;
      }

      $.getScript("//platform.twitter.com/widgets.js");
    });  
  };


  $scope.nextTweet = function() {
    $scope.iterator++;
    console.log("iterator is now " + $scope.iterator);
  }
}

app.controller("MainCtrl", MainCtrl);
