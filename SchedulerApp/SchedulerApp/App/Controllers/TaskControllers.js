﻿(function () {

    var ListTaskController = function ($scope, $filter, $location, TaskService) {

        var taskMeta = {};
        taskMeta.taskDuration = "today";
        $scope.taskMeta = taskMeta;
        $scope.completedTasks = $scope.tasks

        var search = function () {
            TaskService.getTasks($scope.taskMeta.taskDuration, function (data) {
                $scope.tasks = data;
            });
        };

        $scope.$watch("taskMeta.taskDuration", function (newDuration, previousDuration) {
            search(newDuration);
        }, true);

        $scope.$watch("tasks", function (newObject, oldObject) {
            if (newObject === undefined || oldObject === undefined)
                return;

            for (var i = 0; i < newObject.length; i++) {
                if (oldObject[i].Completed !== newObject[i].Completed) {
                    var newState = newObject[i].Completed;
                    TaskService.changeTaskStatus(newObject[i].Id, newState, function (data) {

                    });
                }
            }
        },true);

        $scope.deleteTask = function (taskId) {
            TaskService.deleteTask(taskId, function () {
                $.notify('Task Deleted');
                var item = $filter('filter')($scope.tasks, { Id: taskId }, true);
                if (item.length === 1) {
                    var itemIndex = $scope.tasks.indexOf(item[0]);
                    $scope.tasks.splice(itemIndex, 1);
                }
                else {

                }
            });
        };

        $scope.editTask = function (taskId) {
            $location.path('/editTask/' + taskId);
            //$location.path('/editTask/').search({ taskId: taskId });
        };

        if (!TaskService.tasksLoaded) {
            search();
            $.notify('Now you can drag and drop tasks', { clickToHide: true, className: 'info' });
        }
    };

    var module = angular.module('SchedulerApp');
    module.controller("ListTaskController", ListTaskController);

    module.controller('AddEditTaskController', function ($scope, TaskService, $location, $routeParams) {
        $scope.task = {
            Id: -1,
            Summary: '',
            Description: '',
            Completed: false,
            DueDate: new Date()
        };
        $scope.comment = {
            CommentId: -1,
            TaskId: -1,
            Comment : ''
        };

        $scope.addEditTask = function (taskData) {
            //Don't add a new task if task exists
            if (taskData.Id === -1) {
                TaskService.addTask(taskData, function (response) {
                    $location.path('/');
                });
            }
            else {
                TaskService.editTask(taskData, function (response) {
                    $location.path('/');
                });
            }
            $location.path('/');
        };

        $scope.addEditComment = function (comment) {
            if ($scope.task.Id !== -1) {
                comment.TaskId = $scope.task.Id;
                TaskService.addComment(comment, function (response) {
                    //Notify
                });
            }
        };

        //Editing a task
        if ($routeParams.taskId !== undefined) {
            TaskService.getTask($routeParams.taskId, function (response) {
                $scope.task.Id = response.Id;
                $scope.task.Summary = response.Summary;
                $scope.task.Description = response.Description;
                $scope.task.Completed = response.Completed;
                $scope.task.DueDate = new Date(parseInt(response.DueDate.replace('/Date(', '')));
                $scope.Comments = response.Comments;
            });
        }

        //Can also do 
        //http://stackoverflow.com/questions/18144142/jquery-ui-datepicker-with-angularjs
        $(function () {
            $(".datepicker").datepicker({
                dateFormat: "yy-mm-dd"
            });
        });

    });

    //module.controller('TaskCommentsViewController', function ($scope, TaskService) {
    //    $scope.comment = {
    //        Id: -1,
    //        Summary: '',
    //        Description: ''
    //    };

    //    $scope.taskComments = [];

    //    $scope.testVar = 1;

    //    $scope.addComment = function () {
    //        var obj = comment;
    //    };

    //    getCommentsForTask = function () {
    //        //Call service

    //        //Assign to taskComments variable
    //        var arr = [{ id: 1, comment: 'A new role comes with a whole new set of expectations. There is an implicit' },
    //        { id: 2, comment: 'Almost all organizations put a premium on competence and expertise. As you are trying to orient yourself' },
    //        { id: 3, comment: 'f expectations. There is an implici' },
    //        { id: 4, comment: 'ew role comes with a whole new set of expectations. There is an impli' }];

    //        for (var i = 0; i < arr.length; i++) {
    //            $scope.taskComments.push(arr[i]);
    //        }
    //    };

    //    getCommentsForTask();

    //});

}());