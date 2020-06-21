angular.module('historialApp').controller('editController', [
'$http','$scope','$timeout','$location','$routeParams', 
function($http, $scope, $timeout, $location, $routeParams) {			
	
	var id = $routeParams.id;	
	var vm = this;	
	var array_localidad = [];
	var registro = {};
	var urlBase = '/api/index.php/';
	
	vm.localidad_disabled = true;
	
	loadRegistro(id);
		
	function loadRegistro(idHistorial){
		let params = {};
		params.url = urlBase + 'historial/' + idHistorial;
		params.method = 'GET';
		
		$http(params).then(
			function(response){
				registro = response.data;				
				
				vm.paciente = registro.paciente;
				vm.array_obra_social = registro.obra_sociales;
				vm.array_estado_civil = registro.estado_civiles;
				vm.array_departamento = registro.departamentos;			
				array_localidad = registro.localidades;
				vm.array_localidad = registro.localidades;
				vm.max_nacimiento = setMaxFecha();
				vm.edad = setEdad(vm.paciente.fecha_nacimiento);
				localidadChange();
				
				vm.diagnosticos = registro.diagnosticos;
				vm.array_diabetes_tipos = registro.enfermedades[3].tipos;
				
				vm.enfermedades_asociadas = registro.enfermedades_asociadas;
				vm.factores_de_riesgo_asociados = registro.factores_de_riesgo_asociados;
				 
				vm.close_disabled = false;
			},function(error){
				return error.status;
			});
	};
	
	vm.closeHistorial = function(){
		$location.path('/list');
	};
	
	vm.diabetesChkChange = function() {
		diabetesChkChange();
	}
	
	vm.diabetesTipoChange = function() {
		diabetesTipoChange();
	}
	
	vm.fechaNacimientoChange = function(){
		vm.edad = setEdad(vm.paciente.fecha_nacimiento);
	};
	
	vm.departamentoChange = function(){
		departamentoChange(vm.paciente.departamento_id);
	};
	
	vm.localidadChange = function(){
		localidadChange();
	};
	
	function departamentoChange(id){			
		vm.array_localidad = array_localidad.filter(function(value){
			return value.departamento_id == id;
		});
		vm.localidad_disabled = false;
		vm.paciente.localidad_id = vm.array_localidad[0].id;
		setCodigoPostal(vm.array_localidad[0].codigo_postal)
	}
	
	function localidadChange(){
		var id = vm.paciente.localidad_id;
		localidad = array_localidad.filter(function(value){
			return value.id == id;
		});
		setCodigoPostal(localidad[0].codigo_postal);
	};		
	
	function setCodigoPostal(codigo_postal){
		vm.codigo_postal = codigo_postal;
	}
		
	function setMaxFecha(){
		var today = new Date();
		year = today.getFullYear();
		month = today.getMonth()+1;
		day = today.getDate();
		if (month < 10) 
			month = '0'+month;
		if (day < 10) 
			day = '0'+day;
		return [year, month, day].join('-');
	};
		
	function setEdad(fecha){
		var nacimiento = new Date(fecha);
		var hoy = new Date();			
		var edad = hoy.getFullYear() - nacimiento.getFullYear();
		if (hoy.getMonth() < nacimiento.getMonth()){
			edad -= 1;
		}else if (hoy.getMonth() == nacimiento.getMonth()){
			if (hoy.getDate() < nacimiento.getDate()){
				edad -= 1;
			}
		}						
		
		return edad;
	};
	

	function diabetesChkChange(){
		if (vm.diagnosticos.diabetes == "1"){
			vm.diagnosticos.diabetes_disabled = false;
		}else if(vm.diagnosticos.diabetes == "0"){
			vm.diagnosticos.diabetes_disabled = true;
		}
	}
	
	function diabetesTipoChange(){
		let value = vm.diagnosticos.diabetes_tipo;
		if (value == "8" || value == "9"){
			vm.diagnosticos.diabetes_gestacional_disabled = false;
		}else{
			vm.diagnosticos.diabetes_gestacional_disabled = true;
		}
	}
			
	function updateHistorial(control, campo, nuevo_valor){
		$scope.vm.close_disabled = true;
		$scope.vm.mensajes = 'Guardando ...';
		var params = {};
		params.url = '/api/index.php/'+control+'/'+id;
		params.method = 'POST';
		params.params = {};
		params.data = { data :{
			campo: campo,
			nuevo_valor: nuevo_valor
			}				
		};
		
		$http({
			method: params.method,
			url:	params.url,
			data:	params.data
		}).then(
			function(response){					
				$timeout(function(){
					$scope.vm.mensajes = 'Guardado';
					$scope.vm.close_disabled = false;
				}, 100);
			},function(error){
				console.log(error);
		});			
	}
	/*
	
	vm.templates = [
		'/templates/sections/personal.html',
		'/templates/sections/diagnosticos.html',
		'/templates/sections/controles_clinicos.html',
		'/templates/sections/laboratorio.html',
		'/templates/sections/tratamiento.html',
		'/templates/sections/seguimiento.html',
	];
	vm.template = vm.templates[0];	
			
	vm.activeTemplate = function(index){ 
		vm.template = vm.templates[index];
	}; 
	
	$scope.$watch('vm.paciente.nombre', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		updateHistorial('pacientes', 'nombre', newValue);			
	});
	
	$scope.$watch('vm.paciente.dni', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		updateHistorial('pacientes', 'dni', newValue);			
	});
	

	$scope.$watch('vm.paciente.genero_id', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		updateHistorial('pacientes', 'genero_id', newValue);			
	});

	$scope.$watch('vm.paciente.estudio_id', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		updateHistorial('pacientes', 'estudio_id', newValue);
	});
	

	$scope.$watch('vm.paciente.domicilio', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		updateHistorial('pacientes', 'domicilio', newValue);
	});
	
	$scope.$watch('vm.paciente.fecha_nacimiento', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		updateHistorial('pacientes', 'fecha_nacimiento', newValue);
	});		

	$scope.$watch('vm.paciente.obra_social_id', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		updateHistorial('pacientes', 'obra_social_id', newValue);
	});
	
	$scope.$watch('vm.paciente.estado_civil_id', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		updateHistorial('pacientes', 'estado_civil_id', newValue);
	});
	
	$scope.$watch('vm.paciente.estado_civil_id', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		updateHistorial('pacientes', 'estado_civil_id', newValue);
	});

	$scope.$watch('vm.paciente.departamento_id', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		updateHistorial('pacientes', 'departamento_id', newValue);
	});
	
	$scope.$watch('vm.paciente.localidad_id', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		updateHistorial('pacientes', 'localidad_id', newValue);
	});
	
	$scope.$watch('vm.paciente.telefono', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		updateHistorial('pacientes', 'telefono', newValue);
	});*/
			
}]);


/*function getArrayObraSocial(){
	let params = {};
	params.url = urlBase + 'obra_social';
	params.method = 'GET';
	
	let promesa =	 $http(params).then(
		function(response){
			return response.data.obra_social;					
		},
		function(error){
			return error.status;
		}
	);			
	return promesa;
}

function getArrayEstadoCivil(){
	var params = {};
	params.url = urlBase + 'estado_civil';
	params.method = 'GET';
	
	var promesa = $http(params).then(
		function(response){					
			return response.data.estado_civil;
		},
		function(error){
			return error.status;
		}
	);
	return promesa;
}

function getArrayDepartamento(){
	var params = {};
	params.url = urlBase + 'departamento';
	params.method = 'GET';
	
	var promesa = $http(params).then(
		function(response){
			return response.data.departamento;
		},
		function(error){
			return error.status;
		}
	);
	return promesa;
}
		
function getArrayLocalidad(){
	var params = {};
	params.url = urlBase + 'localidad';
	params.method = 'GET';
	
	var promesa = $http(params).then(
		function(response){					
			return response.data.localidad;
		},
		function(error){
			return error.status;
		}
	);
	return promesa;
}

function getArrayEnfermedades(){
	var params = {};
	params.url = urlBase + 'enfermedad';
	params.method = 'GET';
	
	var promesa = $http(params).then(
		function(response){					
			return response.data.enfermedad;
		},
		function(error){
			return error.status;
		}
	);
	return promesa;
}*/
