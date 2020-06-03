var app =  angular.module('main-app',['ngRoute','angularUtils.directives.dirPagination']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl:'web/templates/home.html'
            }).
            when('/historiales', {
                templateUrl: 'web/templates/buscar.html',
                controller: 'buscar'
            }).
            when('/nuevo', {
                templateUrl: 'web/templates/nuevo.html',
                controller: 'nuevo', controllerAs:'vm'
            }).
            when('/personal/:id', {
                templateUrl: 'web/templates/personal.html',
                controller: 'abrir', controllerAs:'vm'
            }).
            when('/diagnosticos', {
                templateUrl: 'web/templates/diagnosticos.html',
                controller: 'abrir', controllerAs:'vm'
            }).
            when('/controles_clinicos', {
                templateUrl: 'web/templates/controles_clinicos.html'
            }).
            when('/laboratorio', {
                templateUrl: 'web/templates/laboratorio.html'
            }).
            when('/tratamiento', {
                templateUrl: 'web/templates/tratamiento.html'
            }).
            when('/seguimiento', {
                templateUrl: 'web/templates/seguimiento.html'
            });
}]);
