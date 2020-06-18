angular.module('historialApp').
	config(['$routeProvider',
		function ($routeProvider) {
			$routeProvider.
				when('/home', {
					controller: 'homeController',
					controllerAs: 'vm',
					templateUrl: 'templates/historiales-home.html'
					
				}).
				when('/list', {
					controller: 'listController',
					controllerAs: 'vm',
					templateUrl: '/templates/historiales-list.html'
				}).
				when('/new', {
					controller: 'newController',
					controllerAs: 'vm',
					templateUrl: '/templates/historiales-new.html'
				}).
				when('/edit/:id', {
					controller: 'editController',
					controllerAs: 'vm',
					templateUrl: '/templates/historiales-edit.html'
				}).
				otherwise('/home');
		}
	]);