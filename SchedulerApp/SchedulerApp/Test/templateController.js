(function () {

    var app = angular.module("MyApp");

    var TemplateController = function ($scope) {
        $scope.details = "Template Details";
    };

    app.controller("TemplateController", TemplateController);

}());