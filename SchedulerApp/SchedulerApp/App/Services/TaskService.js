(function () {
    var module = angular.module('SchedulerApp');

    module.factory('TaskService', function () {
        var tasks = [];

        return {
            tasks: tasks,
            tasksLoaded: false
        };

    });

}());