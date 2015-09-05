(function () {
    //Reference to the module
    var app = angular.module('MyApp');

    //Define controller
    //We also have a custom service passed to this controller
    var MainController = function ($scope, $location, myViewer) {
        var onComplete = function (data) {
            $scope.user = data;
        },
        onError = function (reason) {
            $scope.error = reason;
        };

        $scope.search = function (username) {
            //We call a function exposed from custom service
            myViewer.getUser(username)
            .then(onComplete, onError);

            $location.path("/template2/" + username);
        };

        //Items in the scope
        $scope.showItems = true;
        $scope.items = [3, 5, 1, 541, 52];
        $scope.username = "angular";
        $scope.message = "Hello " + $scope.username;
    };

    //Another controller
    var SubController = function ($scope) {
        $scope.info = "Info";
    };

    //Register controllers with the module
    //We also registers myViewer service we created
    app.controller("MainController", ["$scope", "$location", "myViewer", MainController]);

    app.controller("SubController", SubController);
}());