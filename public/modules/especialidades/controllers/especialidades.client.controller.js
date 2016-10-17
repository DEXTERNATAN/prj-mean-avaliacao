'use strict';

// Especialidades controller
angular.module('especialidades').controller('EspecialidadesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Especialidades',
	function($scope, $stateParams, $location, Authentication, Especialidades) {
		$scope.authentication = Authentication;

		// Create new Especialidade
		$scope.create = function() {
			// Create new Especialidade object
			var especialidade = new Especialidades ({
				name: this.name,
				descricao: this.descricao
			});

			// Redirect after save
			especialidade.$save(function(response) {
				$location.path('especialidades/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.descricao = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Especialidade
		$scope.remove = function(especialidade) {
			if ( especialidade ) { 
				especialidade.$remove();

				for (var i in $scope.especialidades) {
					if ($scope.especialidades [i] === especialidade) {
						$scope.especialidades.splice(i, 1);
					}
				}
			} else {
				$scope.especialidade.$remove(function() {
					$location.path('especialidades');
				});
			}
		};

		// Update existing Especialidade
		$scope.update = function() {
			var especialidade = $scope.especialidade;

			especialidade.$update(function() {
				$location.path('especialidades/' + especialidade._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Especialidades
		$scope.find = function() {
			$scope.especialidades = Especialidades.query();
		};

		// Find existing Especialidade
		$scope.findOne = function() {
			$scope.especialidade = Especialidades.get({ 
				especialidadeId: $stateParams.especialidadeId
			});
		};
	}
]);