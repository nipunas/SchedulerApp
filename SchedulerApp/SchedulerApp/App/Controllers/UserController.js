(function () {

    var app = angular.module('SchedulerApp');

    var LoginController = function ($scope, HttpService, $window) {

        var onSuccess = function (data) {
            if (data === true) {
                goToApp();
            }
            else {
                alert('Not Logged in');
            }
        },
        goToApp = function () {
            sessionStorage.loggedIn = true;
            sessionStorage.cookie = "1234567890";
            $window.location.href = "app.html";
        };

        $scope.user = {
            Name: '',
            Password: ''
        };

        $scope.login = function () {
            HttpService.login($scope.user)
            .then(onSuccess);
        }

        $scope.signup = function () {
            HttpService.signup()
        }
    };

    app.controller("LoginController", ["$scope", "HttpService", "$window", LoginController]);

    //----------------------------------------------------------------

    var SignupController = function ($scope, HttpService, $window) {

        var onSuccess = function (data) {
            if (data === true) {
                goToApp();
            }
            else {
                alert('Not Logged in');
            }
        },
        goToApp = function () {
            sessionStorage.loggedIn = true;
            sessionStorage.cookie = "1234567890";
            $window.location.href = "app.html";
        };

        $scope.user = {
            Name: '',
            Password: ''
        };

        $scope.login = function () {
            HttpService.login($scope.user)
            .then(onSuccess);
        }
    };

    app.controller("SignupController", ["$scope", "HttpService", "$window", SignupController]);

}());