'use strict';

// Register `historialList` component, along with its associated controller and template
angular.
  module('historialList').
	  component('historialList', {
	    templateUrl: 'templates/historiales.html',
	    controller: ['$http', function HistorialListController($http) {
	      var vm = this;
	      	
	      $http.get('/api/index.php/pacientes').then(function(response) {
	    	  vm.pacientes = response.data.pacientes;
	      });
	    }]	
  });
