(function () {

    var app = angular.module('SchedulerApp');

    var TaskController = function ($scope, HttpService, TaskService) {

        var onComplete = function (data) {
            TaskService.tasks = data;
            $scope.tasks = TaskService.tasks;
            TaskService.tasksLoaded = true;
        },
        getDuration = function (duration) {
            switch (duration) {
                case 'today':
                    return 1;
                case 'week':
                    return 2;
                case 'month':
                    return 3;
                default:
                    return 0;
            }
        },
        search = function (duration) {
            HttpService.getTasks(getDuration(duration), 1)
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

        $scope.checkModel = {
            left: false,
            middle: true,
            right: false
        };

        var taskMeta = {};
        taskMeta.taskDuration = "today";

        $scope.taskMeta = taskMeta;
        $scope.$watch("taskMeta.taskDuration", function (newDuration, previousDuration) {
            search(newDuration);
        }, true);

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