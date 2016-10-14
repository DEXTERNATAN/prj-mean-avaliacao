'use strict';

angular.module('colaborador').controller('ColaboradorController', ['$scope', '$location', 'Colaborador' , 'Especialidades' ,
	function($scope, $location, Colaborador, Especialidades) {
		
		// Create new Colaborador
		$scope.create = function() {
			
			// Create new Colaborador object
			var colaborador = new Colaborador ({
				name: this.name,
				description: this.description
				//especialidade: this.especialidade
			});
			
			console.log('Colaborador cadastrado: ', colaborador);
			console.log(this.especialidade.name);

			// Redirect after save
			colaborador.$save(function(response) {
				$location.path('colaboradorcreate/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.description = '';
				//$scope.especialidade = '';
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of colaborador
		$scope.find = function() {
			$scope.colaborador = Colaborador.query();
		};
		
		// Find a list of colaborador
		$scope.findEspecialidades = function() {
			$scope.especialidades = Especialidades.query();
		};

	}
]);