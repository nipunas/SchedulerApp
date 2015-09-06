(function () {

    var app = angular.module('SchedulerApp');

    var LoginController = function ($scope, $window) {

        $scope.login = function () {

            //Do this after a successfull login
            sessionStorage.loggedIn = true;
            sessionStorage.cookie = "1234567890";
            $window.location.href = "app.html";
        }
    };

    app.controller("LoginController", ["$scope", "$window", LoginController]);

}());