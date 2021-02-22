// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var StoreApp = angular.module('StoreApp', []);


StoreApp.controller('BaseController', function ($scope, $http) {

    $scope.Data = "Test Data";
    $scope.UserName = "ddotreprah";

    $scope.onInit = function () {

        //get geographical data
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(userPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }

        function userPosition(position) {
            $scope.Latitude = position.coords.latitude;
            $scope.Longitude = position.coords.longitude;
            console.log($scope.Latitude);
            console.log($scope.Longitude);

        }

        displayLocation($scope.Latitude, $scope.Longitude);

        function displayLocation(latitude,longitude){
        var request = new XMLHttpRequest();

        var method = 'GET';
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=true&key=AIzaSyA_U69rDAIbWNqhBTSSqb-Ujoqihm1zlMY';
        var async = true;

        request.open(method, url, async);
        request.onreadystatechange = function(){
          if(request.readyState == 4 && request.status == 200){
            var data = JSON.parse(request.responseText);
            var address = data.results[0];
              console.log(data);
          }
        };
        request.send();
      };

      var successCallback = function(position){
        var x = position.coords.latitude;
        var y = position.coords.longitude;
        displayLocation(x,y);
      };

      var errorCallback = function(error){
        var errorMessage = 'Unknown error';
        switch(error.code) {
          case 1:
            errorMessage = 'Permission denied';
            break;
          case 2:
            errorMessage = 'Position unavailable';
            break;
          case 3:
            errorMessage = 'Timeout';
            break;
        }
        document.write(errorMessage);
      };

      var options = {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(successCallback,errorCallback,options);
    }


});




