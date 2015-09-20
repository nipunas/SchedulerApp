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
                case 'getTask':
                    return path + 'Task/GetTask';
                case 'createTask':
                    return path + 'Task/CreateTask';
                case 'editTask':
                    return path + 'Task/EditTask';
                case 'login':
                    return path + 'User/Login';
                case 'deleteTask':
                    return path + 'Task/DeleteTask';
                case 'changeTaskStatus':
                    return path + 'Task/ChangeTaskStatus';
                default:
                    return path + 'Invalid';
            }
        }

        var getTasks = function (duration) {
            return $http.get(urlFactory('tasks') + '/', { params: { "duration": duration } })
                .then(function (response) {
                    return response.data;
                });
        };

        var getTask = function (taskId) {
            return $http.get(urlFactory('getTask') + '/', { params: { "taskId": taskId } })
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

        var changeTaskStatus = function (params) {
            return $http.post(urlFactory('changeTaskStatus'), params)
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

        var editTask = function (task) {
            return $http.post(urlFactory('editTask'), task)
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
            getTask: getTask,
            createTask: createTask,
            editTas: editTask,
            changeTaskStatus: changeTaskStatus,
            deleteTask : deleteTask,
            login: login
        };
    };

    var module = angular.module('SchedulerApp');
    module.factory('HttpService', httpService);

}());