'use strict';

angular.
  module('historialApp').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/historiales', {
          template: '<historial-list></historial-list>'
        }).
        when('/historiales/:historialId', {
          template: '<historial-detail></historial-detail>'
        }).
        otherwise('/historiales');
    }
  ]);
