angular.module('historialApp').controller('editController', [
'$http','$scope','$timeout','$location','$routeParams', 
function($http, $scope, $timeout, $location, $routeParams) {			
	//0800-888-4747
	let id = $routeParams.id;	
	let vm = this;
	let array_updates = [];
	let array_localidad = [];
	let registro = {};
	let urlBase = '/index.php/';
		
	vm.save_updates_disabled = true;
	vm.localidad_disabled = true;
	vm.diabetes_disabled = true;
	vm.diabetes_gestacional_disabled = true;
	vm.hipertension_arterial_disabled = true;
	vm.enfermedad_tiroidea_disabled = true;
	vm.enfermedad_reumatica_disabled = true;
	vm.renal_nefropatia_disabled = true;
	vm.complicaciones_agudas_de_diabetes_tuvo_episodios_disabled = true;
	vm.array_nivel_de_riesgo_cardiovascular_global = [
		{id: 1, intervalo:'menor a 10%'},
		{id: 2, intervalo:'de 10% a menor 20%'},
		{id: 3, intervalo:'de 20% a menor 30%'},
		{id: 4, intervalo:'de 30% a menor 40%'},
		{id: 5, intervalo:'mayor a 40%'}
	];
	vm.laboratorio_observaciones_disabled = true;
	
	loadRegistro(id);
		
	function loadRegistro(idHistorial){
		let params = {};
		params.url = urlBase + 'historial/' + idHistorial;
		params.method = 'GET';
		
		$http(params).then(
			function(response){
				registro = response.data;
				
				vm.array_obra_social = registro.obra_sociales;
				vm.array_estado_civil = registro.estado_civiles;
				vm.array_departamento = registro.departamentos;			
				array_localidad = registro.localidades;
				vm.array_localidad = registro.localidades;
				vm.array_diabetes_tipos = registro.enfermedades[3].tipos;
				vm.array_enfermedad_tiroidea_tipos = registro.enfermedades[1].tipos;
				vm.array_enfermedad_reumatica_tipos = registro.enfermedades[2].tipos;
				
				vm.paciente = registro.paciente;
				vm.max_nacimiento = setMaxFecha();
				vm.edad = setEdad(vm.paciente.fecha_nacimiento);
				localidadChange();
				
				vm.diagnosticos = registro.diagnosticos;
				diabetesChkSet();
				hipertensionArterialChange();
				
				vm.enfermedades_asociadas = registro.enfermedades_asociadas;
				enfermedadTiroideaTipoChange();
				
				vm.factores_de_riesgo_asociados = registro.factores_de_riesgo_asociados;				
				vm.antecedentes_familiares = registro.antecedentes_familiares;				
				vm.odontologia = registro.odontologia;				
				vm.nutricion = registro.nutricion;
				vm.psicologia = registro.psicologia;
				vm.oftalmologia = registro.oftalmologia;
				vm.circulatorio = registro.circulatorio;
				
				vm.renal = registro.renal;
				renalNefropatiaChange();
				
				vm.examen_fisico = registro.examen_fisico;
				vm.complicaciones_agudas_de_diabetes = registro.complicaciones_agudas_de_diabetes;
				tuvoEpisodiosComplicacionesAgudasChange();
				
				vm.laboratorio = registro.laboratorio;
				setIntervaloMicroalbuminuria();
				
				vm.internaciones_relacionadas_con_enfermedad_de_base = registro.internaciones_relacionadas_con_enfermedad_de_base;
				vm.internacion = vm.internaciones_relacionadas_con_enfermedad_de_base[0];
				
				vm.tratamiento_actual = registro.tratamiento_actual;
				vm.tratamiento_conducta_medica = {};
				vm.array_conducta_medica = registro.conducta_medica;
				vm.solicitud_interconsulta = registro.solicitud_interconsulta;
				vm.inmunizaciones = registro.inmunizaciones;
				vm.solicitud_practica = registro.solicitud_practica;
				vm.seguimientos = registro.seguimientos;
				
				vm.close_disabled = false;
			},function(error){
				return error.status;
			});
	};
	
	vm.enfermedadesAsociadasChanges = function() {
		vm.enfermedades_asociadas_disabled = false;
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
	
	vm.hipertensionArterialChange = function(){
		hipertensionArterialChange();
	};
	
	vm.enfermedadTiroideaTipoChange = function(){
		enfermedadTiroideaTipoChange();
	};
	
	vm.enfermedadReumaticaTipoChange = function(){
		enfermedadReumaticaTipoChange();
	};
	
	vm.renalNefropatiaChange = function(){
		renalNefropatiaChange();
	};
	
	vm.tuvoEpisodiosComplicacionesAgudasChange = function() {
		tuvoEpisodiosComplicacionesAgudasChange();
	};
	
	vm.saveUpdatesRegistro = function(){
		saveUpdatesRegistro();
	};
	
	vm.setIntervaloMicroalbuminuria = function() {
		setIntervaloMicroalbuminuria();
	};
		
	vm.saveAddInternacion = function(){
		addInternacion(vm.laboratorio_new_internacion);
	};
		
	function addInternacion(internacion){
		let params = {};
		params.url = '/index.php/internaciones_relacionadas_con_enfermedad_de_base';
		params.method = 'POST';
		params.data = { data :
			{
				fecha: internacion.fecha,
				dias: internacion.dias,
				causas: internacion.causas,
				id_historial: id
			}
		};
			
		$http({
			method: params.method,
			url:	params.url,
			data:	params.data
		}).then(
			function(response){ 
				$(".modal").modal("hide");
				vm.internaciones_relacionadas_con_enfermedad_de_base = response.data;
		},	function(error){
				console.log(error);
		});
	}
	
	/**
	 * 
	 */
	
	vm.setInternacion = function(id) {		
		let internacion = vm.internaciones_relacionadas_con_enfermedad_de_base.filter(function(value){
			return value.id == id;
		});
		vm.internacion = internacion[0];
	};
	
	vm.editInternacion = function(id) {
		let internacion = vm.internaciones_relacionadas_con_enfermedad_de_base.filter(function(value){
			return value.id == id;
		});
		vm.form_edit = internacion[0];
	};
	
	vm.saveEditInternacion = function(){
		let params = {};
		params.url = '/index.php/internaciones_relacionadas_con_enfermedad_de_base/'+vm.form_edit.id;
		params.method = 'POST';
		params.data = { data :
			{
				fecha: vm.form_edit.fecha,
				dias: vm.form_edit.dias,
				causas: vm.form_edit.causas,
				id_historial : id
			}
		};
		
		console.log(params);
			
		$http({
			method: params.method,
			url:	params.url,
			data:	params.data
		}).then(
			function(response){ 
				$(".modal").modal("hide");
				vm.internaciones_relacionadas_con_enfermedad_de_base = response.data; 
		},	function(error){
				console.log(error);
		});
	};
	
	vm.setIdBeforeDelete = function(id) {
		vm.id_delete = id;
	};
	
	vm.deleteInternacion = function() {
		let params = {};
		params.url = '/index.php/internaciones_relacionadas_con_enfermedad_de_base/delete';
		params.method = 'POST';
		params.data = { data : 
			{
				id : vm.id_delete,
				id_historial : id 
			}
		};
		
		console.log(params);
			
		$http({
			method: params.method,
			url:	params.url,
			data:	params.data
		}).then(
			function(response){ 
				$(".modal").modal("hide");
				vm.internaciones_relacionadas_con_enfermedad_de_base = response.data; 
		},	function(error){
				console.log(error);
		});
	};
	
	vm.cancelEditInternacion = function() {
		vm.form_edit = {};
	};
	
	vm.saveAddConductaMedica = function() {
		let params = {};
		params.url = '/index.php/conducta_medica';
		params.method = 'POST';
		params.data = { data :
			{
				fecha: vm.tratamiento_conducta_medica.fecha,
				observacion: vm.tratamiento_conducta_medica.observacion,
				id_historial: id
			}
		};
			
		$http({
			method: params.method,
			url:	params.url,
			data:	params.data
		}).then(
			function(response){ 
				$(".modal").modal("hide");
				vm.array_conducta_medica = response.data;
				vm.tratamiento_conducta_medica.fecha = "";
				vm.tratamiento_conducta_medica.observacion = "";
		},	function(error){
				console.log(error);
		});
	};
	
	vm.editConductaMedica = function(id, fecha, observacion) {
		vm.tratamiento_conducta_medica.id = id;
		vm.tratamiento_conducta_medica.fecha = fecha;
		vm.tratamiento_conducta_medica.observacion = observacion;
	};
	
	vm.saveEditConductaMedica = function() {
		let params = {};
		params.url = '/index.php/conducta_medica/'+ vm.tratamiento_conducta_medica.id;
		params.method = 'POST';
		params.data = { data :
			{
				fecha: vm.tratamiento_conducta_medica.fecha,
				observacion: vm.tratamiento_conducta_medica.observacion,
				id_historial : id
			}
		};
		
		console.log(params);
			
		$http({
			method: params.method,
			url:	params.url,
			data:	params.data
		}).then(
			function(response){ 
				$(".modal").modal("hide");
				vm.array_conducta_medica = response.data;
				vm.tratamiento_conducta_medica.id = null;
				vm.tratamiento_conducta_medica.fecha = "";
				vm.tratamiento_conducta_medica.observacion = ""; 
		},	function(error){
				console.log(error);
		});
	};
	
	vm.cancelEditConductaMedica = function() {
		vm.tratamiento_conducta_medica.id = null;
		vm.tratamiento_conducta_medica.fecha = "";
		vm.tratamiento_conducta_medica.observacion = "";
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
	
	function diabetesChkSet(){
		if (vm.diagnosticos.diabetes == 1){
			vm.diabetes_disabled = false;
			let value = vm.diagnosticos.diabetes_tipo;
			if (value == "8" || value == "9"){
				vm.diabetes_gestacional_disabled = false;
			}
		}
	}
	
	function diabetesChkChange(){
		if (vm.diagnosticos.diabetes == 1){
			vm.diabetes_disabled = false;
		}else if(vm.diagnosticos.diabetes == 0){
			//almacenar valores en un historial de diabetes
			vm.diagnosticos.diabetes_tiempo_evolucion = 0;
			vm.diagnosticos.diabetes_tipo = 1;
			vm.diagnosticos.diabetes_semanas_gestacion = 0;
			vm.diabetes_gestacional_disabled = true;
			vm.diabetes_disabled = true;
		}
	}
	
	function diabetesTipoChange(){
		let value = vm.diagnosticos.diabetes_tipo;
		if (value == "8" || value == "9"){
			vm.diabetes_gestacional_disabled = false;
		}else{
			vm.diabetes_gestacional_disabled = true;
		}
	}
	
	function hipertensionArterialChange(){
		let control = vm.diagnosticos.hipertension_arterial;
		if (control == 1){ vm.hipertension_arterial_disabled = false;}
		if (control == 0){ 
			vm.hipertension_arterial_disabled = true;
			vm.diagnosticos.hipertension_arterial_tiempo_evolucion = 0;
		}
	}
	
	function enfermedadTiroideaTipoChange(){
		let control = vm.enfermedades_asociadas.enfermedad_tiroidea;
		if (control == 1){
			vm.enfermedad_tiroidea_disabled = false;			
		}
		if (control == 0){
			vm.enfermedad_tiroidea_disabled = true;
		}
	}
	
	function enfermedadReumaticaTipoChange(){
		let control = vm.enfermedades_asociadas.enfermedad_reumatica;
		if (control == 1){
			vm.enfermedad_reumatica_disabled = false;			
		}
		if (control == 0){
			vm.enfermedad_reumatica_disabled = true;
		}
	}

	function renalNefropatiaChange() {
		let control = vm.renal.nefropatia;
		if (control == 1){
			vm.renal_nefropatia_disabled = false;			
		}
		if (control == 0){
			vm.renal_nefropatia_disabled = true;
		}
	}
	
	function tuvoEpisodiosComplicacionesAgudasChange() {
		let control = vm.complicaciones_agudas_de_diabetes.tuvo_episodios;
		if (control == 1){
			vm.complicaciones_agudas_de_diabetes_tuvo_episodios_disabled = false;
		}
		if (control == 0){
			vm.complicaciones_agudas_de_diabetes_tuvo_episodios_disabled = true;
		}
	}
	
	vm.cantidadEpisodiosChange = function() {
		/*let hipoglucemias = parseInt(vm.complicaciones_agudas_de_diabetes.hipoglucemia_severas);
		let cetoacidosis = parseInt(vm.complicaciones_agudas_de_diabetes.cetoacidosis);
		let result = hipoglucemias + cetoacidosis;
		vm.complicaciones_agudas_de_diabetes.cantidad_episodios_ultimo_anio = result;*/ 
	};
	
	function pushArrayUpdates(pcontrol, pcampo, nuevo_valor){
		let registro = array_updates.find(update => update.control == pcontrol);
		if (registro == undefined){
			let campos = [];
			campos.push({campo: pcampo, valor: nuevo_valor});
			registro = { control:pcontrol, campos:campos };
			array_updates.push(registro);
		}else{
			let subregistro = registro.campos.find(data => data.campo == pcampo);
			if (subregistro == undefined){
				registro.campos.push({campo: pcampo, valor: nuevo_valor});
			}else{
				subregistro.valor = nuevo_valor;
			}
		}
		vm.save_updates_disabled = false;
	}
		
	function saveUpdatesRegistro(){		
		array_updates.forEach(registro => saveUpdatesCampos(registro));
		array_updates = [];
		vm.save_updates_disabled = true;
	}
	
	function saveUpdatesCampos(registro){
		registro.campos.forEach(subregistro => updateHistorial(registro.control,subregistro.campo,subregistro.valor));
	}
	
	function setIntervaloMicroalbuminuria() {
		let value = vm.laboratorio.microalbuminuria;
		if (value < 30){ vm.laboratorio_intervalo_microalbuminuria = 'menor a 30 mg/dl'};
		if (value >= 30 && value <= 300){ vm.laboratorio_intervalo_microalbuminuria = 'de 30 a 300 mg/dl'};
		if (value > 300){ vm.laboratorio_intervalo_microalbuminuria = 'mayor a 300 mg/dl'};	
	}
	
	
				
	function updateHistorial(control, campo, nuevo_valor){
		$scope.vm.close_disabled = true;
		$scope.vm.mensajes = 'Guardando ...';
		var params = {};
		params.url = '/index.php/'+control+'/'+id;
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
				console.log(response);
				$timeout(function(){
					$scope.vm.mensajes = 'Guardado';
					$scope.vm.close_disabled = false;
				}, 1000);
				$timeout(function(){
					$scope.vm.mensajes = '';
				}, 2000);
			},function(error){
				console.log(error);
		});			
	}
	
	vm.templates = [
		'/static/templates/sections/personal.html',
		'/static/templates/sections/diagnosticos.html',
		'/static/templates/sections/controles_clinicos.html',
		'/static/templates/sections/laboratorio.html',
		'/static/templates/sections/tratamiento.html',
		'/static/templates/sections/seguimiento.html',
	];
	vm.template = vm.templates[4];	
			
	vm.activeTemplate = function(index){ 
		vm.template = vm.templates[index];
	}; 
	
	$scope.$watch('vm.paciente.nombre', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}		
		pushArrayUpdates('pacientes', 'nombre', newValue);			
	});
	
	$scope.$watch('vm.paciente.dni', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('pacientes', 'dni', newValue);			
	});
	

	$scope.$watch('vm.paciente.genero_id', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('pacientes', 'genero_id', newValue);			
	});

	$scope.$watch('vm.paciente.estudio_id', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('pacientes', 'estudio_id', newValue);
	});
	

	$scope.$watch('vm.paciente.domicilio', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('pacientes', 'domicilio', newValue);
	});
	
	$scope.$watch('vm.paciente.fecha_nacimiento', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('pacientes', 'fecha_nacimiento', newValue);
	});		

	$scope.$watch('vm.paciente.obra_social_id', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('pacientes', 'obra_social_id', newValue);
	});
	
	$scope.$watch('vm.paciente.estado_civil_id', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('pacientes', 'estado_civil_id', newValue);
	});
	
	$scope.$watch('vm.paciente.estado_civil_id', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('pacientes', 'estado_civil_id', newValue);
	});

	$scope.$watch('vm.paciente.departamento_id', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('pacientes', 'departamento_id', newValue);
	});
	
	$scope.$watch('vm.paciente.localidad_id', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('pacientes', 'localidad_id', newValue);
	});
	
	$scope.$watch('vm.paciente.telefono', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('pacientes', 'telefono', newValue);
	});
	
	$scope.$watch('vm.diagnosticos.glucemia_alterada_en_ayunas', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('diagnosticos', 'glucemia_alterada_en_ayunas', newValue);
	});
		
	$scope.$watch('vm.diagnosticos.tolerancia_glucosa_alterada', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('diagnosticos', 'tolerancia_glucosa_alterada', newValue);
	});
	
	$scope.$watch('vm.diagnosticos.diabetes', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('diagnosticos', 'diabetes', newValue);
	});
	
	$scope.$watch('vm.diagnosticos.diabetes_tiempo_evolucion', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('diagnosticos', 'diabetes_tiempo_evolucion', newValue);
	});
	
	$scope.$watch('vm.diagnosticos.diabetes_tipo', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('diagnosticos', 'diabetes_tipo', newValue);
	});
	
	$scope.$watch('vm.diagnosticos.diabetes_semanas_gestacion', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('diagnosticos', 'diabetes_semanas_gestacion', newValue);
	});
	
	$scope.$watch('vm.diagnosticos.dislipemia', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('diagnosticos', 'dislipemia', newValue);
	});
	
	$scope.$watch('vm.diagnosticos.hipertension_arterial', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('diagnosticos', 'hipertension_arterial', newValue);
	});
	
	$scope.$watch('vm.diagnosticos.hipertension_arterial_tiempo_evolucion', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('diagnosticos', 'hipertension_arterial_tiempo_evolucion', newValue);
	});
	
	$scope.$watch('vm.diagnosticos.preclasificacion_rcvg', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('diagnosticos', 'preclasificacion_rcvg', newValue);
	});
		
	$scope.$watch('vm.enfermedades_asociadas.enfermedad_tiroidea_tipo', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('enfermedades_asociadas', 'enfermedad_tiroidea_tipo', newValue);
	});
	
	$scope.$watch('vm.enfermedades_asociadas.enfermedad_tiroidea', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('enfermedades_asociadas', 'enfermedad_tiroidea', newValue);
	});
	
	$scope.$watch('vm.enfermedades_asociadas.enfermedad_reumatica', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('enfermedades_asociadas', 'enfermedad_reumatica', newValue);
	});
	
	$scope.$watch('vm.enfermedades_asociadas.enfermedad_reumatica_tipo', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('enfermedades_asociadas', 'enfermedad_reumatica_tipo', newValue);
	});
	
	$scope.$watch('vm.enfermedades_asociadas.enfermedad_celiaca', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('enfermedades_asociadas', 'enfermedad_celiaca', newValue);
	});
	
	$scope.$watch('vm.enfermedades_asociadas.tbc', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('enfermedades_asociadas', 'tbc', newValue);
	});
	
	$scope.$watch('vm.factores_de_riesgo_asociados.obesidad', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('factores_de_riesgo_asociados', 'obesidad', newValue);
	});
	
	$scope.$watch('vm.factores_de_riesgo_asociados.sedentarismo', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('factores_de_riesgo_asociados', 'sedentarismo', newValue);
	});
	
	$scope.$watch('vm.factores_de_riesgo_asociados.tabaco', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('factores_de_riesgo_asociados', 'tabaco', newValue);
	});
	
	$scope.$watch('vm.factores_de_riesgo_asociados.alcoholismo', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('factores_de_riesgo_asociados', 'alcoholismo', newValue);
	});
	
	$scope.$watch('vm.factores_de_riesgo_asociados.anticoagulantes', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('factores_de_riesgo_asociados', 'anticoagulantes', newValue);
	});
	
	$scope.$watch('vm.factores_de_riesgo_asociados.corticoides', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('factores_de_riesgo_asociados', 'corticoides', newValue);
	});
	
	$scope.$watch('vm.factores_de_riesgo_asociados.anticonceptivos', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('factores_de_riesgo_asociados', 'anticonceptivos', newValue);
	});
	
	$scope.$watch('vm.factores_de_riesgo_asociados.menospausia_prematura', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('factores_de_riesgo_asociados', 'menospausia_prematura', newValue);
	});
	
	$scope.$watch('vm.antecedentes_familiares.hta', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('antecedentes_familiares', 'hta', newValue);
	});
	
	$scope.$watch('vm.antecedentes_familiares.iam', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('antecedentes_familiares', 'iam', newValue);
	});
	
	$scope.$watch('vm.antecedentes_familiares.acv_ait', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('antecedentes_familiares', 'acv_ait', newValue);
	});
	
	$scope.$watch('vm.antecedentes_familiares.dislipemia', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('antecedentes_familiares', 'dislipemia', newValue);
	});
	
	$scope.$watch('vm.antecedentes_familiares.diabetes', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('antecedentes_familiares', 'diabetes', newValue);
	});
	
	$scope.$watch('vm.antecedentes_familiares.enf_celiaca', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('antecedentes_familiares', 'enf_celiaca', newValue);
	});
	
	$scope.$watch('vm.odontologia.control_odontologico', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('odontologia', 'control_odontologico', newValue);
	});
	
	$scope.$watch('vm.odontologia.enfermedad_periodontal', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('odontologia', 'enfermedad_periodontal', newValue);
	});
	
	$scope.$watch('vm.odontologia.flemones', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('odontologia', 'flemones', newValue);
	});
		
	$scope.$watch('vm.psicologia.realizo_entrevista', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('psicologia', 'realizo_entrevista', newValue);
	});
	
	$scope.$watch('vm.psicologia.asiste_a_terapia', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('psicologia', 'asiste_a_terapia', newValue);
	});
	
	$scope.$watch('vm.enfermeria.consejeria', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('enfermeria', 'consejeria', newValue);
	});
	
	$scope.$watch('vm.enfermeria.curaciones', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('enfermeria', 'curaciones', newValue);
	});
	
	$scope.$watch('vm.oftalmologia.examen_actual', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('oftalmologia', 'examen_actual', newValue);
	});
	$scope.$watch('vm.oftalmologia.fondo_de_ojos', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('oftalmologia', 'fondo_de_ojos', newValue);
	});
	$scope.$watch('vm.oftalmologia.amaurosis', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('oftalmologia', 'amaurosis', newValue);
	});
	$scope.$watch('vm.oftalmologia.cataratas', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('oftalmologia', 'cataratas', newValue);
	});
	
	$scope.$watch('vm.oftalmologia.glaucoma', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('oftalmologia', 'glaucoma', newValue);
	});
	
	$scope.$watch('vm.oftalmologia.maculopatia', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('oftalmologia', 'maculopatia', newValue);
	});
	
	$scope.$watch('vm.oftalmologia.retinopatia', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('oftalmologia', 'retinopatia', newValue);
	});
	
	$scope.$watch('vm.oftalmologia.proliferativa', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('oftalmologia', 'proliferativa', newValue);
	});
	
	$scope.$watch('vm.oftalmologia.no_proliferativa', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('oftalmologia', 'no_proliferativa', newValue);
	});
		
	$scope.$watch('vm.examen_fisico.peso', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('examen_fisico', 'peso', newValue);
	});
	
	$scope.$watch('vm.examen_fisico.talla', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('examen_fisico', 'talla', newValue);
	});
	
	$scope.$watch('vm.examen_fisico.perimetro_cintura', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('examen_fisico', 'perimetro_cintura', newValue);
	});
	
	$scope.$watch('vm.examen_fisico.imc', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('examen_fisico', 'imc', newValue);
	});
	
	$scope.$watch('vm.examen_fisico.ta_sistolica', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('examen_fisico', 'ta_sistolica', newValue);
	});
	
	$scope.$watch('vm.examen_fisico.ta_diastolica', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('examen_fisico', 'ta_diastolica', newValue);
	});
		
	$scope.$watch('vm.complicaciones_agudas_de_diabetes.tuvo_episodios', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('complicaciones_agudas_de_diabetes', 'tuvo_episodios', newValue);
	});
	
	$scope.$watch('vm.complicaciones_agudas_de_diabetes.hipoglucemia_severas', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('complicaciones_agudas_de_diabetes', 'hipoglucemia_severas', newValue);
	});
	
	$scope.$watch('vm.complicaciones_agudas_de_diabetes.cetoacidosis', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('complicaciones_agudas_de_diabetes', 'cetoacidosis', newValue);
	});
		
	$scope.$watch('vm.nutricion.tiene_conocimientos_basicos', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('nutricion', 'tiene_conocimientos_basicos', newValue);
	});
	$scope.$watch('vm.nutricion.asiste_control', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('nutricion', 'asiste_control', newValue);
	});
	$scope.$watch('vm.nutricion.cumple_plan_de_alimentacion', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('nutricion', 'cumple_plan_de_alimentacion', newValue);
	});
		
	$scope.$watch('vm.circulatorio.acv_ait', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('circulatorio', 'acv_ait', newValue);
	});
	
	$scope.$watch('vm.circulatorio.aim', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('circulatorio', 'aim', newValue);
	});
	
	$scope.$watch('vm.circulatorio.angioplastia_bypass', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('circulatorio', 'angioplastia_bypass', newValue);
	});
	
	$scope.$watch('vm.circulatorio.ecg', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('circulatorio', 'ecg', newValue);
	});
	
	$scope.$watch('vm.circulatorio.ecodoppler', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('circulatorio', 'ecodoppler', newValue);
	});
		
	$scope.$watch('vm.renal.nefropatia', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('renal', 'nefropatia', newValue);
	});
	
	$scope.$watch('vm.renal.nefropatia_tipo', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('renal', 'nefropatia_tipo', newValue);
	});
	
	$scope.$watch('vm.renal.dialisis', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('renal', 'dialisis', newValue);
	});
	
	$scope.$watch('vm.renal.transplante', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('renal', 'transplante', newValue);
	});
	
	$scope.$watch('vm.renal.ecografia', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('renal', 'ecografia', newValue);
	});
	
	$scope.$watch('vm.laboratorio.glucemia_en_ayunas', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'glucemia_en_ayunas', newValue);
	});
	
	$scope.$watch('vm.laboratorio.ptog_desde', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'ptog_desde', newValue);
	});
	
	$scope.$watch('vm.laboratorio.ptog_hasta', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'ptog_hasta', newValue);
	});
	
	$scope.$watch('vm.laboratorio.hba1c', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'hba1c', newValue);
	});
	
	$scope.$watch('vm.laboratorio.clearence_de_creatinina', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'clearence_de_creatinina', newValue);
	});
	
	$scope.$watch('vm.laboratorio.colesterol_total', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'colesterol_total', newValue);
	});
	
	$scope.$watch('vm.laboratorio.got', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'got', newValue);
	});
	
	$scope.$watch('vm.laboratorio.gpt', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'gpt', newValue);
	});
	
	$scope.$watch('vm.laboratorio.fal', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'fal', newValue);
	});
	
	$scope.$watch('vm.laboratorio.proteinuria_creatininuria', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'proteinuria_creatininuria', newValue);
	});
	
	$scope.$watch('vm.laboratorio.trigliceridos', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'trigliceridos', newValue);
	});
	
	$scope.$watch('vm.laboratorio.colesterol_hdl', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'colesterol_hdl', newValue);
	});
	
	$scope.$watch('vm.laboratorio.colesterol_ldl', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'colesterol_ldl', newValue);
	});
	
	$scope.$watch('vm.laboratorio.creatinina', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'creatinina', newValue);
	});
	
	$scope.$watch('vm.laboratorio.fg', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'fg', newValue);
	});
	
	$scope.$watch('vm.laboratorio.iga_total', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'iga_total', newValue);
	});
	
	$scope.$watch('vm.laboratorio.antitransglutaminasa', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'antitransglutaminasa', newValue);
	});
	
	$scope.$watch('vm.laboratorio.proteinuria', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'proteinuria', newValue);
	});
	
	$scope.$watch('vm.laboratorio.urea', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'urea', newValue);
	});
	
	$scope.$watch('vm.laboratorio.microalbuminuria', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'microalbuminuria', newValue);
	});
	
	$scope.$watch('vm.laboratorio.nivel_de_riesgo_cardiovascular_global', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'nivel_de_riesgo_cardiovascular_global', newValue);
	});
	
	$scope.$watch('vm.laboratorio.observaciones', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'observaciones', newValue);
	});
	
	$scope.$watch('vm.laboratorio.participacion_talleres_autocuidado', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('laboratorio', 'participacion_talleres_autocuidado', newValue);
	});
	
	$scope.$watch('vm.tratamiento_actual.insulina_nph', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('tratamiento_actual', 'insulina_nph', newValue);
	});
	
	$scope.$watch('vm.tratamiento_actual.metformina', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('tratamiento_actual', 'metformina', newValue);
	});
	
	$scope.$watch('vm.tratamiento_actual.glibenclamida', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('tratamiento_actual', 'glibenclamida', newValue);
	});
	
	$scope.$watch('vm.tratamiento_actual.enalapril', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('tratamiento_actual', 'enalapril', newValue);
	});
	
	$scope.$watch('vm.tratamiento_actual.atenolol', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('tratamiento_actual', 'atenolol', newValue);
	});
	
	$scope.$watch('vm.tratamiento_actual.furosemida', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('tratamiento_actual', 'furosemida', newValue);
	});
	
	$scope.$watch('vm.tratamiento_actual.insulina_rapida', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('tratamiento_actual', 'insulina_rapida', newValue);
	});
	
	$scope.$watch('vm.tratamiento_actual.hidroclorotiazida', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('tratamiento_actual', 'hidroclorotiazida', newValue);
	});
	

	$scope.$watch('vm.tratamiento_actual.aas', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('tratamiento_actual', 'aas', newValue);
	});
	
	$scope.$watch('vm.tratamiento_actual.simvastatina', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('tratamiento_actual', 'simvastatina', newValue);
	});
	
	$scope.$watch('vm.tratamiento_actual.fenofibrato', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('tratamiento_actual', 'fenofibrato', newValue);
	});
	
	$scope.$watch('vm.tratamiento_actual.automonitoreo', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('tratamiento_actual', 'automonitoreo', newValue);
	});
   
	$scope.$watch('vm.solicitud_interconsulta.cardiologia', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('solicitud_interconsulta', 'cardiologia', newValue);
	});
	
	$scope.$watch('vm.solicitud_interconsulta.endocrinologia', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('solicitud_interconsulta', 'endocrinologia', newValue);
	});
	
	$scope.$watch('vm.solicitud_interconsulta.nefrologia', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('solicitud_interconsulta', 'nefrologia', newValue);
	});
	
	$scope.$watch('vm.solicitud_interconsulta.nutricion', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('solicitud_interconsulta', 'nutricion', newValue);
	});
	

	$scope.$watch('vm.solicitud_interconsulta.odontologia', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('solicitud_interconsulta', 'odontologia', newValue);
	});
	
	$scope.$watch('vm.solicitud_interconsulta.oftalmologia', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('solicitud_interconsulta', 'oftalmologia', newValue);
	});
	
	$scope.$watch('vm.solicitud_interconsulta.psicologia', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('solicitud_interconsulta', 'psicologia', newValue);
	});
	
	$scope.$watch('vm.inmunizaciones.antigripal', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('inmunizaciones', 'antigripal', newValue);
	});
	
	$scope.$watch('vm.inmunizaciones.antineumococo', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('inmunizaciones', 'antineumococo', newValue);
	});
	
	$scope.$watch('vm.solicitud_practica.laboratorios', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('solicitud_practica', 'laboratorios', newValue);
	});
	
	$scope.$watch('vm.solicitud_practica.laboratorios_observacion', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('solicitud_practica', 'laboratorios_observacion', newValue);
	});
	
	$scope.$watch('vm.solicitud_practica.otros_estudios', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('solicitud_practica', 'otros_estudios', newValue);
	});
	
	$scope.$watch('vm.solicitud_practica.otros_estudios_observacion', function(newValue, oldValue){
		if (newValue === oldValue || newValue === undefined || oldValue === undefined){
			return;
		}
		pushArrayUpdates('solicitud_practica', 'otros_estudios_observacion', newValue);
	});
	
	
}]);
