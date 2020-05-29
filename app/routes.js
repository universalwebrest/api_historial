var app =  angular.module('main-app',['ngRoute','angularUtils.directives.dirPagination']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'web/templates/home.html'
            }).
            when('/pacientes', {
                templateUrl: 'web/templates/buscar.html'
            }).
            when('/personal', {
                templateUrl: 'web/templates/personal.html'
            }).
            when('/diagnosticos', {
                templateUrl: 'web/templates/diagnosticos.html'
            });
}]);
