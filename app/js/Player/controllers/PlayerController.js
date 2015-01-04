(function(angular){
	'use strict';
	
	angular.module('Baseball')

		.controller('PlayerController',  ['$scope', '$http', '$stateParams', 
			function($scope, $http, $stateParams){
				var playerId = $stateParams.playerId;
				
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
					});

				function totalStats(){
					angular.forEach($scope.player.games, function(game){
						$scope.totals.AB += game.AB;
						$scope.totals.H += game.H;
						$scope.totals.HR += game.HR;
						$scope.totals.RBI += game.RBI;
					});
					
					$scope.totals.AVG = ($scope.totals.H / $scope.totals.AB)
				}
				
			}
		]);

})(angular);