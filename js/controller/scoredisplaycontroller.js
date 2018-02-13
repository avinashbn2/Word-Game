app.controller("scoreDisplayController", function($scope, $http){
   $scope.loadScores = function() {
        $http.get("/test.txt").then( function(data){
            $scope.scoreData = data;
        }, function(data){
            console.log(data);
        });
   } 
});