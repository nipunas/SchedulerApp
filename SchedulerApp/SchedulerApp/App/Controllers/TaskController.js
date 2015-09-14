(function () {

    var app = angular.module('SchedulerApp');

    var TaskController = function ($scope, $filter, HttpService, TaskService) {

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
            item.Completed = model.Completed

            return item;
        },
        onTaskCreationComplete = function (response) {
            //TODO:
        };

        onTaskDeletionComplete = function (response) {
            //TODO:
        };

        $scope.task = {
            Id: -1,
            Summary: '',
            Description: '',
            Completed: false
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

            HttpService.createTask(newTask)
                .then(onTaskCreationComplete);

            //We need to push a new task everytime. Otherwise the same task with references
            //will be added each time you press add task
            TaskService.tasks.push(newTask);
        }

        $scope.deleteTask = function (taskId) {
            var item = $filter('filter')($scope.tasks, { Id: taskId }, true);
            if (item.length === 1) {
                var itemIndex = $scope.tasks.indexOf(item[0]);
                $scope.tasks.splice(itemIndex, 1);

                HttpService.deleteTask(item[0].Id)
                .then(onTaskDeletionComplete);
            }
            else {
                //Error
            }
        }

        if (!TaskService.tasksLoaded) {
            search();
        }
    };

    app.controller("TaskController", ["$scope", "$filter", "HttpService", "TaskService", TaskController]);

}());