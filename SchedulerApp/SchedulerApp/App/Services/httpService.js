(function () {

    var httpService = function ($http, $location) {

        var urlFactory = function (service) {
            var url = $location.protocol() + "://" + $location.host();

            if (url.indexOf("localhost") > -1) {
                url = url + '/schedulerapp';
            }
            var path = url + '/';

            switch (service) {
                case 'tasks':
                    return path + 'Task/GetTasks';
                case 'createTask':
                    return path + 'Task/CreateTask';
                case 'login':
                    return path + 'User/Login';
                case 'deleteTask':
                    return path + 'Task/DeleteTask';
                case 'completeTask':
                    return path + 'Task/CompleteTask';
                default:
                    return path + 'Invalid';
            }
        }

        var getTasks = function (duration, userId) {
            return $http.get(urlFactory('tasks') + '/', { params: { "duration": duration, "userId": userId } })
                .then(function (response) {
                    return response.data;
                });
        };

        var deleteTask = function (taskId) {
            return $http.post(urlFactory('deleteTask'), { "id": taskId })
                .then(function (response) {
                    return response.data;
                });
        };

        var completeTask = function (task) {
            return $http.post(urlFactory('completeTask'), task)
                .then(function (response) {
                    return response.data;
                });
        };

        var createTask = function (task) {
            return $http.post(urlFactory('createTask'), task)
                .then(function (response) {
                    return response.data;
                });
        };

        var login = function (data) {
            return $http.post(urlFactory('login'), data)
                .then(function (response) {
                    return response.data;
                });
        };

        return {
            getTasks: getTasks,
            createTask: createTask,
            completeTask: completeTask,
            deleteTask : deleteTask,
            login: login
        };
    };

    var module = angular.module('SchedulerApp');
    module.factory('HttpService', httpService);

}());