app.factory('pacienteService', function($http) {
	var myService = {
	
			getPacientes : function() {				
				var parametros = {};
				parametros.url = 'pacientes';
				parametros.method = 'GET';
				var pacientes = $http(parametros)
					.success(function(response) {
						console.log(response);
						return response;						
					})					
					.error(function(response){
						console.log(response);
					});
				
				return pacientes;
			}
	};
	
	return myService;
	
});