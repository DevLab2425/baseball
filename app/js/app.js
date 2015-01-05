(function(angular){
	
	angular.module('Baseball', ['ui.router', 'ui.bootstrap'])
	
		.config(['$stateProvider', function($stateProvider){
			$stateProvider
				
				.state('home',{
					url: '/',
					templateUrl: 'templates/main-template.html',
					controller: 'BaseballController',
				})
				
				.state('player', {
					url: '/players/:playerId',
					templateUrl: 'templates/player-template.html',
					controller: 'PlayerController'
				});

			// $routeProvider
			// 	.when('/', {
			// 		url: '/',
			// 		templateUrl: 'templates/main-template.html',
			// 		controller: 'BaseballController'
			// 	})
			// 	.when('/players/:playerId/:page?', {
			// 		url: '/players/:playerId',
			// 		templateUrl: 'templates/player-template.html',
			// 		controller: 'PlayerController'
			// 	})
			// 	.otherwise({
			// 		redirectTo:'/'
			// 	});
		}]);

})(angular);