(function () {

    var app = angular.module('SchedulerApp');

    var TaskController = function ($scope, HttpService) {

        var onComplete = function (data) {
            $scope.tasks = data;
        };

        $scope.search = function () {
            HttpService.getTasks(1)
            .then(onComplete);
        };
    };

    app.controller("TaskController", ["$scope", "HttpService", TaskController]);

}());