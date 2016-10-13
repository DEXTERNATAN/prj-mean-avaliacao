'use strict';

angular.module('colaborador').controller('ColaboradorController', ['$scope', '$location', 'Colaborador',
	function($scope, $location, Colaborador) {
		
		// Create new Colaborador
		$scope.create = function() {
			
			// Create new Colaborador object
			var colaborador = new Colaborador ({
				name: this.name,
				description: this.description
			});
			console.log('criando uma colaborador: ', colaborador);
			// Redirect after save
			colaborador.$save(function(response) {
				$location.path('colaboradorcreate/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of colaborador
		$scope.find = function() {
			$scope.colaborador = Colaborador.query();
		};
	}
]);