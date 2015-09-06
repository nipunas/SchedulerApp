(function () {

    var app = angular.module('SchedulerApp');

    var SettingsController = function ($scope, HttpService) {
        $scope.a = 1;
    };

    app.controller("SettingsController", ["$scope", SettingsController]);

}());