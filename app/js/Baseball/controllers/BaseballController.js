(function(angular){
	'use strict';
	
	angular.module('Baseball')

		.controller('BaseballController', ['$scope', '$http', '$state', 
			function($scope, $http, $location, $state){
				$scope.players = [];
				$http.get('data/players.json')
					.success(function(players){
						$scope.players = players;
					})
					.error(
					function(err){
						throw new Error(err);
					});
					
				$scope.details = function(player){
					$state.go('player', {playerId: player.id});
				}
			}
		]);

})(angular);
