(function () {
    
    var app = angular.module('SchedulerApp', []);

    app.factory("UserServices", function () {
        var factory = {};
        factory.users = ["A", "B"];
        return factory;
    });

    var HeaderController = function ($scope, $rootScope, UserServices) {
        $scope.title = "This is Header Title";
        $scope.users = UserServices.users;
    };

    app.controller("HeaderController", ["$scope", "$rootScope", "UserServices", HeaderController]);

}());