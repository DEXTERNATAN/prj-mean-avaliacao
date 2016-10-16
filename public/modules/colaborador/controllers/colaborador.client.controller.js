'use strict';

angular.module('colaborador').controller('ColaboradorController', ['$scope', '$location', 'Colaborador' , 'Especialidades' ,
	function($scope, $location, Colaborador, Especialidades) {
		
		$scope.especialidades = Especialidades.query();

		// Create new Colaborador
		$scope.create = function() {
			
			// Create new Colaborador object
			var colaborador = new Colaborador ({
				name: this.name,
				description: this.description,
				especialidade: this.especialidade
			});
			
			console.log('Colaborador cadastrado: ',colaborador);
			
			// Redirect after save
			colaborador.$save(function(response) {
				console.log('aqui', response);
				//$location.path('colaboradorcreate/' + response._id);

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
			console.log('Colaborador: ', $scope.colaborador);
		};
		

	}
]);