(function(angular){
	
	angular.module('Baseball', ['ngRoute'])
	
		.config(['$routeProvider', function($routeProvider){
			
			$routeProvider
				.when('/', {
					url: '/',
					templateUrl: 'templates/main-template.html',
					controller: 'MainController'
				})
				.when('/players/:playerId', {
					url: '/players/:playerId',
					templateUrl: 'templates/player-template.html',
					controller: 'PlayerController'
				})
				.otherwise({
					redirectTo:'/'
				})
		}])
	
		.controller('BaseballController', ['$scope', '$http', '$location', function($scope, $http, $location){
			$scope.players = [];
			$http.get('data/players.json')
				.success(function(players){
					// load players
					$scope.players = players;
				})
				.error(
				function(err){
					// throw error
					throw new Error(err);
				});
				
			$scope.details = function(player){
				$location.url('/players/' + player.id);
			}
		}])
		
		.controller('PlayerController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
			var playerId = $routeParams.playerId;
			
			$scope.player = {};
			$scope.totals = {
				AB: 0,
				H: 0,
				HR: 0,
				RBI: 0,
				AVG: 0
			};
			
			$http.get('data/' + playerId + '.json')
				.success(function(playerData){
					$scope.player = playerData;
					totalStats();
				})
				.error(function(err){
					throw new Error(err);
				})
			
			function totalStats(){
				angular.forEach($scope.player.games, function(game){
					$scope.totals.AB += game.AB;
					$scope.totals.H += game.H;
					$scope.totals.HR += game.HR;
					$scope.totals.RBI += game.RBI;
				});
				
				$scope.totals.AVG = ($scope.totals.H / $scope.totals.AB)
			}
			
		}]);
	
})(angular);