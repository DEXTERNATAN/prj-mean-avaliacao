'use strict';

// Divisaos controller
angular.module('divisaos').controller('DivisaosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Divisaos',
	function($scope, $stateParams, $location, Authentication, Divisaos) {
		$scope.authentication = Authentication;

		// Create new Divisao
		$scope.create = function() {
			// Create new Divisao object
			var divisao = new Divisaos ({
				name: this.name,
				descricao: this.name,
				UF: this.name,
				especialidade: this.name

			});

			// Redirect after save
			divisao.$save(function(response) {
				$location.path('divisaos/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.descricao = '';
				$scope.UF = '';
				$scope.especialidade = '';
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Divisao
		$scope.remove = function(divisao) {
			if ( divisao ) { 
				divisao.$remove();

				for (var i in $scope.divisaos) {
					if ($scope.divisaos [i] === divisao) {
						$scope.divisaos.splice(i, 1);
					}
				}
			} else {
				$scope.divisao.$remove(function() {
					$location.path('divisaos');
				});
			}
		};

		// Update existing Divisao
		$scope.update = function() {
			var divisao = $scope.divisao;

			divisao.$update(function() {
				$location.path('divisaos/' + divisao._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Divisaos
		$scope.find = function() {
			$scope.divisaos = Divisaos.query();
		};

		// Find existing Divisao
		$scope.findOne = function() {
			$scope.divisao = Divisaos.get({ 
				divisaoId: $stateParams.divisaoId
			});
		};
	}
]);