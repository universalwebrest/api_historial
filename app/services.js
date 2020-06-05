var myServices = angular.module('myServices', []);

myServices.factory('homeService', ['$http', 
	function($http){		
		return service = {
			getPacientes : function(){
				$http({url:'/api/index.php/pacientes', method:'GET'})			
				.then(function(response){
					return response.data.pacientes;
				},function(error){
					return error.status;
				});
			} 
		}
}]);

myServices.factory('historialesService', ['$http',
	function($http) {
	
}]);


