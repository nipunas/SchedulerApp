(function () {

    var app = angular.module('SchedulerApp');

    var TaskController = function ($scope, HttpService) {

        var onComplete = function (data) {
            $scope.tasks = data;
        },
        search = function () {
            HttpService.getTasks(1)
            .then(onComplete);
        },
        task = function (model) {

            var item = {};
            item.Id = model.Id;
            item.Summary = model.Summary;
            item.Description = model.Description;

            return item;
        };

        $scope.task = {
            Id: -1,
            Summary: '',
            Description: ''
        }

        $scope.addTask = function () {
            var newTask = new task($scope.task);

            //We need to push a new task everytime. Otherwise the same task with references
            //will be added each time you press add task
            $scope.tasks.push(newTask);
        }

        search();
    };

    app.controller("TaskController", ["$scope", "HttpService", TaskController]);

}());