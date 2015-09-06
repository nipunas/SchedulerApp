(function () {

    var app = angular.module('SchedulerApp');

    var TaskController = function ($scope, HttpService, TaskService) {

        var onComplete = function (data) {
            TaskService.tasks = data;
            $scope.tasks = TaskService.tasks;
            TaskService.tasksLoaded = true;
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

        $scope.tasks = TaskService.tasks;

        $scope.addTask = function () {
            var newTask = new task($scope.task);

            //We need to push a new task everytime. Otherwise the same task with references
            //will be added each time you press add task
            TaskService.tasks.push(newTask);
        }

        if (!TaskService.tasksLoaded) {
            search();
        }
    };

    app.controller("TaskController", ["$scope", "HttpService", "TaskService", TaskController]);

}());