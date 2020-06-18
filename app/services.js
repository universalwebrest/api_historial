
angular.module('historialApp').factory('editService',['$http',
	function($http){
	
		var mypaciente = {};
					
		function _setPaciente(){
			$http.get('api/index.php/pacientes/1').then(function(response){
				  mypaciente = response.data;
			});
		}
	
		var service = { paciente: mypaciente, setPaciente : _setPaciente};
		
		return service;
}]);