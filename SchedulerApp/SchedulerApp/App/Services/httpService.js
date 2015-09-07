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
                case 'login':
                    return path + 'User/Login';
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