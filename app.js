var app = angular.module('shouldyoufollow', []);

function MainCtrl($scope, $http) {
  $scope.submitSnForm = function() {
    $http.get("api.php?screen_name=" + $scope.screenName).success(function(data) {
      console.log(data);
      $scope.tweets = data;
      $scope.iterator = 0;
      $scope.thumbs = 0;

      for(var key in $scope.tweets) {
        $scope.tweets[key].key = key;
      }

      console.log($scope.tweets.length);

      $.getScript("//platform.twitter.com/widgets.js");
    });  
  };


  $scope.nextTweet = function(value) {
    $scope.thumbs += value;
    console.log("You have accumulated " + $scope.thumbs + " thumbs");
    if($scope.iterator < $scope.tweets.length - 1) {
      $scope.iterator++;
      console.log("iterator is now " + $scope.iterator);
    }
    else {
      // You have reached the end of the tweets.
      alert("Score: " + $scope.thumbs + " out of " + $scope.tweets.length);
    }
  }
}

app.controller("MainCtrl", MainCtrl);
