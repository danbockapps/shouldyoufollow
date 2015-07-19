var app = angular.module('shouldyoufollow', []);

function MainCtrl($scope, $http) {  
  $scope.submitSnForm = function() {
    $scope.thumbsInProgress = true;
    $http.get("api.php", {params: {
      screen_name: $scope.screenName,
      include_rts: $scope.includeRts
    }}).success(function(data) {
      console.log(data);
      $scope.tweets = data;
      $scope.iterator = 0;
      $scope.thumbs = 0;

      for(var key in $scope.tweets) {
        $scope.tweets[key].key = key;
      }

      console.log($scope.tweets.length);
      $scope.denominator = Math.min($scope.tweets.length - 1, 10);

      $.getScript("//platform.twitter.com/widgets.js");
    });  
  };


  $scope.nextTweet = function(value) {
    $scope.thumbs += value;
    console.log("You have accumulated " + $scope.thumbs + " thumbs");
 
    if($scope.iterator + 1 >= $scope.denominator) {
      // You have reached the end of the tweets.
      alert("Score: " + $scope.thumbs + " out of " + $scope.denominator);
    }
    else {
      $scope.iterator++;
    }
  }
}

app.controller("MainCtrl", MainCtrl);
