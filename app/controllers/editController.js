
angular.module('historialApp').controller('editController', [
	'$http','$scope','$timeout','$location','$routeParams','debounce','editService', 
	function($http, $scope, $timeout, $location, $routeParams, debounce, editService) {
		
		var id = $routeParams.id;
		var vm = this;
		var array_localidad = [];		
		var counter = 0;
		vm.paciente = {};
		vm.localidad_disabled = true;
		
		loadArrayObraSocial();		
		loadArrayEstadoCivil();		
		loadArrayDepartamento();		
		loadArrayLocalidad();		
		loadHistorial();
						
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
		
		vm.closeHistorial = function(){
			$location.path('/list');
		};
				
		vm.departamento_change = function(){
			departamento_change();
		};
		
		vm.localidad_change = function(){
			localidad_change();
		};
		
		vm.fecha_nacimiento_change = function(){
			vm.edad = setEdad(vm.paciente.fecha_nacimiento);
		};
								
		function loadHistorial(){
			$http.get('/api/index.php/historial/'+id)
			.then(function(response){

				vm.historial = response.data.historial;
				vm.paciente = response.data.paciente;
				vm.edad = setEdad(vm.paciente.fecha_nacimiento);
				vm.max_nacimiento = setMaxFecha();
				vm.diagnosticos = response.data.diagnosticos;
				vm.enfermedades_asociadas = response.data.enfermedades_asociadas;
				vm.factores_de_riesgo_asociados = response.data.factores_de_riesgo_asociados;
				vm.antecedentes_familiares = response.data.antecedentes_familiares;
				vm.odontologia = response.data.odontologia;
				vm.nutricion = response.data.nutricion;
				vm.psicologia = response.data.psicologia;
				vm.enfermeria = response.data.enfermeria;
				vm.oftalmologia = response.data.oftalmologia;
				vm.circulatorio = response.data.circulatorio;
				vm.renal = response.data.renal;
				vm.examen_fisico = response.data.examen_fisico;
				vm.complicaciones_agudas_de_diabetes = response.data.complicaciones_agudas_de_diabetes;
				vm.laboratorio = response.data.laboratorio;
				vm.tratamiento_actual = response.data.tratamiento_actual;
				vm.conducta_medica = response.data.conducta_medica;
				vm.solicitud_interconsulta = response.data.solicitud_interconsulta;
				vm.inmunizaciones = response.data.inmunizaciones;
				vm.solicitud_practica = response.data.solicitud_practica;
				vm.seguimiento = response.data.seguimiento;
				vm.close_enabled = false;
				localidad_change();
			}, function(error){
				return 'error en get historial';
			});
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
		}
		
		function setCodigoPostal(codigo_postal){
			vm.codigo_postal = codigo_postal;
		}
		
		function localidad_change(){
			var id = vm.paciente.localidad_id;
			localidad = array_localidad.filter(function(value){
				return value.id == id;
			});
			setCodigoPostal(localidad[0].codigo_postal);
		}
		
		function departamento_change(){
			var id = vm.paciente.departamento_id;			
			vm.array_localidad = array_localidad.filter(function(value){
				return value.departamento_id == id;
			});
			vm.localidad_disabled = false;
			vm.paciente.localidad_id = vm.array_localidad[0].id;
			setCodigoPostal(vm.array_localidad[0].codigo_postal)
		}
		
		function loadArrayObraSocial(){
			var params = {};
			params.url = '/api/index.php/obra_social';
			params.method = 'GET';
			
			$http(params).then(
				function(response){					
					vm.array_obra_social = response.data.obra_social;
				},
				function(error){
					vm.array_obra_social = error.status;
				}
			);
		}
		
		function loadArrayEstadoCivil(){
			var params = {};
			params.url = '/api/index.php/estado_civil';
			params.method = 'GET';
			
			$http(params).then(
				function(response){					
					vm.array_estado_civil = response.data.estado_civil;
				},
				function(error){
					vm.array_estado_civil = error.status;
				}
			);
		}
		
		function loadArrayDepartamento(){
			var params = {};
			params.url = '/api/index.php/departamento';
			params.method = 'GET';
			
			$http(params).then(
				function(response){
					vm.array_departamento = response.data.departamento;
				},
				function(error){
					vm.array_departamento = error.status;
				}
			);
		}
				
		function loadArrayLocalidad(){
			var params = {};
			params.url = '/api/index.php/localidad';
			params.method = 'GET';
			$http(params).then(
				function(response){					
					array_localidad = response.data.localidad;					
					vm.array_localidad = array_localidad;
				},
				function(error){
					array_localidad = error.status;
				}
			);
		}
				
		function updateHistorial(control, campo, nuevo_valor){
			vm.close_enabled = true;
			vm.mensajes = 'Guardando ...';
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
						vm.mensajes = 'Guardado';
						vm.close_enabled = false;
					}, 100);
				},function(error){
					console.log(error);
			});			
		}
		
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
		});
		
}]);
