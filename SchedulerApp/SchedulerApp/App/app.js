﻿(function () {
    
    var app = angular.module('SchedulerApp', ["ngRoute", "angular-sortable-view"]);

    //Register routes via. Config
    app.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: "Templates/Home.html"
        })
        .when('/login', {
            templateUrl: "index.html",
            controller: "UserController"
        })
        .when('/signup', {
            templateUrl: "Templates/User/Signup.html",
            controller: "UserController"
        })
        .when('/logout', {
            templateUrl: "index.html"
        })
        .when('/addTask', {
            templateUrl: "Templates/Task/CreateTask.html",
            controller: "AddEditTaskController"
        })
        .when('/editTask/:taskId', {
            templateUrl: "Templates/Task/CreateTask.html",
            controller: "AddEditTaskController"
        })
        .when('/settings', {
            templateUrl: "Templates/Settings.html",
            controller: "SettingsController"
        })
        .otherwise({
            redirectTo: "/"
        });

    });

    //Resource
    //http://stackoverflow.com/questions/10486769/cannot-get-to-rootscope
    app.run(function ($rootScope, $location, $window) {

        //http://stackoverflow.com/questions/18918579/angularjs-best-way-to-limit-access-to-logged-in-users
        $rootScope.$on('$routeChangeStart', function (event, next) {
            $rootScope.savedLocation = $location.url();
            if ($rootScope.savedLocation === "/logout") {
                sessionStorage.removeItem('loggedIn');
                //$window.location.href = 'index.html';
            }

            var userAuthenticated = sessionStorage.loggedIn; /* Check if the user is logged in */
            if (!userAuthenticated) {
                /* You can save the user's location to take him back to the same page after he has logged-in */

                //If not logged in redirect to index page
                $window.location.href = 'index.html';
            }
        });
    });

    app.factory("UserServices", function () {
        var factory = {};
        factory.users = ["A", "B"];
        return factory;
    });

    var HeaderController = function ($scope, $rootScope, UserServices) {
        $scope.title = "SchedulerApp";
        $scope.users = UserServices.users;
    };


    app.controller("HeaderController", ["$scope", "$rootScope", "UserServices", HeaderController]);

}());