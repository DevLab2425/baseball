(function(angular){
	'use strict';
	
	angular.module('Baseball')

		.controller('PlayerController',  ['$scope', '$http', '$stateParams', '$filter', 
			function($scope, $http, $stateParams, $filter){
				var playerId = $stateParams.playerId;
				
				$scope.player = {};
				
				
				$http.get('data/' + playerId + '.json')
					.success(function(playerData){
						$scope.player = playerData;
						$scope.filteredGames = playerData.games;
						totalStats();
						$scope.sort('date');
					})
					.error(function(err){
						throw new Error(err);
					});
				
				function totalStats(){
					resetTotals();
					
					angular.forEach($scope.filteredGames, function(game){
						$scope.totals.AB += game.AB;
						$scope.totals.H += game.H;
						$scope.totals.HR += game.HR;
						$scope.totals.RBI += game.RBI;
					});
					
					$scope.totals.AVG = ($scope.totals.H / $scope.totals.AB)
				}
				
				function resetTotals(){
					$scope.totals = {
						AB: 0,
						H: 0,
						HR: 0,
						RBI: 0,
						AVG: 0
					};
				}
				
				$scope.sort = function(column){
					var _current = $scope.sort.column;
					if(_current === column){
						column = '-'+_current;
					}
					console.log(column);
					$scope.sort.column = column;
				}
				
				$scope.$watch('filter.opp', function(newVal, oldVal){
					totalStats();
				});
				
				
			}
		]);

})(angular);