(function () {
    var app = angular.module('MyApp', ["ngRoute"]);

    //Config loaded initially
    app.config(function ($routeProvider) {
        //We create another controll for demonstration purpose

        $routeProvider
        .when("/template", {
            templateUrl: "template.html",
            controller: "TemplateController"
        })
        .when("/template2/:username", {
            templateUrl: "template2.html",
            controller: "TemplateController2"
        })
        .when("/template2/:username/:reponame", {
            templateUrl: "template2.html",
            controller: "TemplateController2"
        })
        .otherwise({
            redirectTo: "/template"
        });

    });

}());