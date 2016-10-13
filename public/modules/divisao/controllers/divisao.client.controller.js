'use strict';

angular.module('divisao').controller('DivisaoController', ['$scope', '$location', 'Divisao',
	function($scope, $location, Divisao) {
		
		// Create new Divisao
		$scope.create = function() {
			
			// Create new Divisao object
			var divisao = new Divisao ({
				name: this.name,
				description: this.description
			});
			console.log('criando uma divisao: ', divisao);
			// Redirect after save
			divisao.$save(function(response) {
				$location.path('create-divisao/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Divisao
		$scope.find = function() {
			$scope.divisao = Divisao.query();
		};
	}
]);