(function () {

    var app = angular.module("MyApp");

    var TemplateController2 = function ($scope, $routeParams) {
        $scope.details = "Template 2 Details";
        $scope.username = $routeParams.username;
    };

    app.controller("TemplateController2", TemplateController2);

}());