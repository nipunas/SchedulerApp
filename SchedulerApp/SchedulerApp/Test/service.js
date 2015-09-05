(function () {
    var myViewer = function ($http) {

        var getUser = function (username) {
            return $http.get('https://api.github.com/users/' + username)
                .then(function (response) {
                    return response.data;
                });
        };

        return {
            getUser: getUser
        };
    };

    var module = angular.module("MyApp");
    module.factory("myViewer", myViewer);
    
}());