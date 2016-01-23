(function () {

    var app = angular.module('SchedulerApp');

    var SettingsController = function ($scope, HttpService) {
        $scope.a = 1;
        $scope.username = 'user42211-S';
        $scope.password = 'q232';

        $scope.options = [
            { id: '1', name: 'Option A' },
            { id: '2', name: 'Option B' },
            { id: '3', name: 'Option C' }
        ];
    };

    app.controller("SettingsController", ["$scope", SettingsController]);

}());