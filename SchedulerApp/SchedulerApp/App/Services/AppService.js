(function () {
    var module = angular.module('SchedulerApp');

    module.factory('AppService', function () {
        var loggedIn = false,
            username = '';

        return {
            loggedIn: loggedIn,
            username: username
        };

    });

}());