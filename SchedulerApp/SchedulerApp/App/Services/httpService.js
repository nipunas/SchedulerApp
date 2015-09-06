(function () {

    var httpService = function ($http) {

        var urlFactory = function (service) {
            var path = 'http://localhost/SchedulerApp/';

            switch (service) {
                case 'tasks':
                    return path + 'Task/GetTasks';
                case 'login':
                    return path + 'User/Login';
                default:
                    return path + 'Invalid';
            }
        }

        var getTasks = function (userId) {
            return $http.get(urlFactory('tasks') + '/' + userId)
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
            login: login
        };
    };

    var module = angular.module('SchedulerApp');
    module.factory('HttpService', httpService);

}());