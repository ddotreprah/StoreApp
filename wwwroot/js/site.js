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

            $http.get("https://api.openweathermap.org/data/2.5/weather?lat=" + $scope.Latitude + "&lon=" + $scope.Longitude + "&appid=a0618ca9923dc71599a816cb4e5fc1b6").then(function (response) {
                console.log(response.data);
                $scope.UserCity = response.data.name;
            });
        }
    }

    
});




