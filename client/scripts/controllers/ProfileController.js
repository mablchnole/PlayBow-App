angular.module('myApp').controller('ProfileController', [
  '$scope',
  '$rootScope',
  '$http',
  '$window',
  '$location',
  'Upload',
  function($scope, $rootScope, $http, $window, $location, Upload) {
    $rootScope.playmateProfile = [];
    $rootScope.allPlaymates = [];
    $rootScope.playmateMatches = [];



    // get method to retrieve all playmates
    $scope.getPlaymatesToFilter = function() {
      // retrieve data from server
      $http({
        method: 'GET',
        url: '/getPlaymatesToFilter'
      }).then(function(response) {
        $rootScope.allPlaymates = response.data;
        console.log('all', $rootScope.allPlaymates);
      }, function myError (response) {
        console.log(response.statusText);
      });
    }; // end getPlaymatesToFilter

    $scope.getPlaymatesToFilter();

    // get method to retrieve newest playmate created from server
    $scope.displayProfile = function() {
      $http({
        method: 'GET',
        url: '/getNewest'
      }).then(function(response) {
        $rootScope.playmateProfile = response.data;
        console.log('YES! Newest playmate:', $rootScope.playmateProfile);
        // find matches for this profile
        for(var i=0; i < $rootScope.allPlaymates.length; i++) {
          console.log('inside for loop, all plcess playstyle', $rootScope.allPlaymates[i].playstyles[0]);
          if($rootScope.playmateProfile[0].playstyles[0] === $rootScope.allPlaymates[i].playstyles[0]) {
            $rootScope.playmateMatches.push($rootScope.allPlaymates[i]);
            console.log('array of playmate matches', $rootScope.playmateMatches);
          } else {
            console.log("We're sorry. There are no matches at this time!");
          }
        } // end for loop

      }, function myError (response) {
        console.log(response.statusText);
      });
    }; // end displayProfile
    $scope.displayProfile();




}]);
