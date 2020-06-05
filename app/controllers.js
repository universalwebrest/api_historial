var myControllers = angular.module('myControllers', []);

myControllers.controller('homeController', ['homeService', 
	function(homeService){
		var vm = this;
	
		vm.inicializar = function(){
			console.log('inicializar desde homeController');
		}
}]);

myControllers.controller('historialesController', ['historialesService', 
	function(historialesService){
	
		var vm = this;
		
		vm.pacientes = [];
		vm.array_obra_social = [];
		vm.array_estado_civil = [];
		vm.array_departamento = [];
		vm.array_localidad = [];
		vm.array_enfermedades_tipo = [];
		
		vm.historial = {};
				
		
		vm.guardar_historial = function(){
			alert('Historial almacenado exitosamente');
			$location.path('/historiales');
		}
		
		vm.cancelar = function() {
			
		}
		
}]);

myControllers.controller('newController', []);

myControllers.controller('editController', []);