angular.module('myApp').controller('PlaymateController', [
  '$scope',
  '$rootScope',
  '$http',
  '$window',
  '$location',
  'Upload',
  function($scope, $rootScope, $http, $window, $location, Upload, $filter) {

    $rootScope.allPlaymates = [];
    $rootScope.favePlaymates = [];
    $scope.playstyles = [];

    // simple substring filter
    $scope.customArrayFilter = function(item) {
      return(item.playstyles.indexOf('it') != -1);
    };

    ////////////////////////////////////////////////////////////
    //                    POST METHODS                        //
    ////////////////////////////////////////////////////////////

    // upload image on submit
    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
          $scope.upload($scope.file);
          console.log('in submit function, file to upload:', $scope.file);
      }
    }; // end submit function

    // upload image to aws and input data to database
    $scope.upload = function(file) {
      Upload.upload ({
        url: '/uploads',
        data: {
          file: file,
          'user': $scope.user,
          'comment': $scope.comment
        } // end data
      }).then(function(resp) {
        console.log('in then success block, upload method:', resp.data.location);

        // collect user input to send to database
        var playmateToSend = {
          name: $scope.nameIn,
          breed: $scope.breedIn,
          age: $scope.ageIn,
          gender: $scope.genderIn,
          sterile: $scope.sterileIn,
          vaccinated: $scope.vaccinatedIn,
          location: resp.data.location,
          size: $scope.sizeIn,
          playstyles: $scope.playstyles
        };
        console.log('sending to server:', playmateToSend);
        // post method to send input data to database
        $http({
          method: 'POST',
          url: '/addPlaymate',
          data: playmateToSend
        }).then(function() {
          $scope.displayPlaymates();
        });

        // function to bind list of checkbox options and push to one array
        $scope.add = function(value) {
          if (!angular.isArray($scope.playstyles)) {
            $scope.playstyles = [];
          }
          if (-1 === $scope.playstyles.indexOf(value)) {
            $scope.playstyles.push(value);
            console.log('checkbox function array:', $scope.playstyles);
          }
        }; // end add function
        // not currently using this but may want to in the future
        $scope.remove = function(value) {
          if (!angular.isArray($scope.playstyles)) {
            return;
          }
          var index = $scope.playstyles.indexOf(value);
          if (-1 !== index) {
            $scope.playstyles.splice(index, 1);
          }
        }; // end remove function
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        // $scope.displayPlaymates();
        $location.path('/profile');
      }, function(resp) {
          console.log('Error status: ' + resp.status);
      }, function(evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }; // end upload function

    // send selected favorites to the database
    $scope.addFave = function(index){
      console.log('addFave button clicked');
      var faveToSend = {
        name: $rootScope.allPlaymates[index].name,
        breed: $rootScope.allPlaymates[index].breed,
        age: $rootScope.allPlaymates[index].age,
        gender: $rootScope.allPlaymates[index].gender,
        sterile: $rootScope.allPlaymates[index].sterile,
        vaccinated: $rootScope.allPlaymates[index].vaccinated,
        location: $scope.allPlaymates[index].location
      };
      console.log('sending fave to server:', faveToSend);
      // post method to send fave to server
      $http({
        method: 'POST',
        url: '/addFave',
        data: faveToSend
      }).then(function() {
        $scope.displayFaves();
      }); // end post route
    }; // end addFave


    ////////////////////////////////////////////////////////////
    //                     GET METHODS                        //
    ////////////////////////////////////////////////////////////

    // get method to retrieve all playmates
    $scope.displayPlaymates = function() {
      // retrieve data from server
      $http({
        method: 'GET',
        url: '/getPlaymates'
      }).then(function(response) {
        $rootScope.allPlaymates = response.data;
        console.log('all the playmates back from server', $rootScope.allPlaymates);
      }, function myError (response) {
        console.log(response.statusText);
      });
    }; // end displayPlaymates

    $scope.displayPlaymates();

    // retrieve just the faves from server to display
    $scope.displayFaves = function() {
      // get method to retrieve faves
      $http({
        method: 'GET',
        url: '/getFaves'
      }).then(function(response) {
        $rootScope.favePlaymates = response.data;
        console.log('all the favorites back from server', $rootScope.favePlaymates);
      }, function myError (response) {
        console.log(response.statusText);
      });
    }; // end displayPlaymates

    $scope.displayFaves();

    ////////////////////////////////////////////////////////////
    //                    DELETE METHOD                      //
    ////////////////////////////////////////////////////////////

    // delete fave from list and database
    $scope.removeFave = function(faveId) {
      var idToSend = {
        id: faveId
      };
      console.log('sending this id to delete:', idToSend);
      $http ({
        method: 'DELETE',
        url: '/removeFave',
        data: idToSend,
        headers: {'Content-Type': 'application/json;charset=utf-8'}
      }).then(function() {
        $scope.displayFaves();
        console.log('successfully deleted from database');
      });
    }; // end removeFave

}]);
