app.controller('abrir', function(historialService, $routeParams) {
	var vm = this;
	
	id = $routeParams.id
	
	/*
	$http.get('http://medical.com/apirest/index.php/obra_social_controller/index/')
	.success(function(data){
		vm.array_obra_social = data.obra_social;
		vm.obra_social = vm.array_obra_social[0];
	});
	
	$http.get('http://medical.com/apirest/index.php/estado_civil_controller/index/')
	.success(function(data){
		vm.array_estado_civil = data.estado_civil;
		vm.estado_civil = vm.array_estado_civil[0];
	});
			
	$http.get('http://medical.com/apirest/index.php/departamento_controller/index/')
	.success(function(data){
		vm.array_departamento = data.departamento;
	});
			
	$http.get('http://medical.com/apirest/index.php/localidad_controller/index/')
	.success(function(data){
		vm.array_localidad = data.localidad;
	});
	
	$http.get('http://medical.com/apirest/index.php/enfermedad_controller/find/4')
	.success(function(data){
		vm.diabetes_tipos = data.enfermedad.tipos;
	});*/
	
});

app.controller('nuevo', function($location) {
	var vm = this;
	
	vm.guardar_historial = function(){
		alert('Historial almacenado exitosamente');
		$location.path('/historiales');
	};
	
	vm.cancelar = function() {
		
	};
	
});

app.controller('buscar', function(pacienteService, $location) {
	
	var vm = this;
	
	vm.pacientes = pacienteService.getPacientes();
		
	vm.abrir_historial = function(id) {
		$location.path('/personal/'+id);
	}
				
});