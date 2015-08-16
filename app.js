var app = angular.module('shouldyoufollow', []);

function MainCtrl($scope, $http, $timeout) {
  $scope.status = 'snForm';
  
  $scope.submitSnForm = function() {
    $scope.status = 'spinner';
    
    // $scope.includeRts is undefined if the checkbox hasn't been touched.
    // api.php needs it to be false instead.
    if(!$scope.includeRts) {
      $scope.includeRts = false;
    }
    
    $http.get("api.php", {params: {
      screen_name: $scope.screenName,
      include_rts: $scope.includeRts
    }}).success(function(data) {
      console.log(data);
      
      if(data.errors) {
        $scope.status = 'error';
        return;
      }
      
      if(data.length === 0) {
        $scope.status = 'noTweets';
        return;
      }
      
      $scope.tweets = shuffleArray(data);
      $scope.iterator = 0;
      $scope.thumbs = 0;

      for(var key in $scope.tweets) {
        $scope.tweets[key].key = key;
      }

      console.log($scope.tweets.length);
      $scope.denominator = Math.min($scope.tweets.length, 10);

      $.getScript("//platform.twitter.com/widgets.js", function(a, b, c){
          $scope.status = 'thumbs';
          $scope.$apply();
          console.log("Twitter widgets script done.");
      });
    });  
  };


  $scope.nextTweet = function(value) {
    $scope.thumbs += value;
    console.log("You have accumulated " + $scope.thumbs + " thumbs");
 
    if($scope.iterator + 1 >= $scope.denominator) {
      // You have reached the end of the tweets.
      $scope.status = "result";
    }
    else {
      $scope.iterator++;
    }
  };
  
  $scope.startOver = function() {
    $scope.status = 'snForm';

    $timeout(function(){
        $('#screenName').focus().select();
    });
  };
}

app.controller("MainCtrl", MainCtrl);


/******************************************************************************/

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
