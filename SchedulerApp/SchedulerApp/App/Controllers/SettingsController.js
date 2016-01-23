(function () {

    var app = angular.module('SchedulerApp');

    var SettingsController = function ($scope, HttpService) {
        $scope.a = 1;
        $scope.userName = 'user42211-S';
        $scope.password = 'q232';

        
    };

    app.controller("SettingsController", ["$scope", SettingsController]);

}());