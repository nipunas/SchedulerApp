(function () {

    var httpService = function ($http) {

        var urlFactory = function (service) {
            var path = 'http://localhost:60913/';

            switch (service) {
                case 'tasks':
                    return path + 'Task/GetTasks';
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

        return {
            getTasks: getTasks
        };
    };

    var module = angular.module('SchedulerApp');
    module.factory('HttpService', httpService);

}());