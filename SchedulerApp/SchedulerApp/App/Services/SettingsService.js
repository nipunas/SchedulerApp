(function () {
    var module = angular.module('SchedulerApp');

    module.factory('SettingsService', function () {
        var loggedIn = false,
            username = '';

        return {
            loggedIn: loggedIn,
            username: username
        };

    });

}());