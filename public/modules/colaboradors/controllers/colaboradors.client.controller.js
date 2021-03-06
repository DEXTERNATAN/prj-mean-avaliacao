'use strict';

// Colaboradors controller
angular.module('colaboradors').controller('ColaboradorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Colaboradors', 'Especialidades', 'Divisaos' ,
	function($scope, $stateParams, $location, Authentication, Colaboradors, Especialidade, Divisaos) {
		$scope.authentication = Authentication;
		$scope.especialidades = Especialidade.query();
		$scope.divisoes = Divisaos.query();

		// Create new Colaborador
		$scope.create = function() {
			// Create new Colaborador object
			var colaborador = new Colaboradors ({
				name: this.name,
				matricula: this.matricula,
				telefone: this.telefone,
				especialidade: this.especialidade,
				divisao: this.divisao,
			});
			
			// Redirect after save
			colaborador.$save(function(response) {
				$location.path('colaboradors/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.matricula = '';
				$scope.telefone = '';
				$scope.especialidade = '';
				$scope.divisao = '';
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Colaborador
		$scope.remove = function(colaborador) {
			if ( colaborador ) { 
				colaborador.$remove();

				for (var i in $scope.colaboradors) {
					if ($scope.colaboradors [i] === colaborador) {
						$scope.colaboradors.splice(i, 1);
					}
				}
			} else {
				$scope.colaborador.$remove(function() {
					$location.path('colaboradors');
				});
			}
		};

		// Update existing Colaborador
		$scope.update = function() {
			var colaborador = $scope.colaborador;
			
			colaborador.$update(function() {
				$location.path('colaboradors/' + colaborador._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Colaboradors
		$scope.find = function() {
			$scope.colaboradores = Colaboradors.query();
		};

		// Find existing Colaborador
		$scope.findOne = function() {
			$scope.colaborador = Colaboradors.get({ 
				colaboradorId: $stateParams.colaboradorId
			});
		};


	}
]);