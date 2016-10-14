'use strict';

angular.module('papel').controller('PapelController', ['$scope', '$location', 'Papel',
	function($scope, $location, Papel) {
		
		// Create new Paper
		$scope.create = function() {
			
			// Create new Paper object
			var papel = new Papel ({
				name: this.name,
				description: this.description
			});
			
			// Redirect after save
			papel.$save(function(response) {
				$location.path('create-divisao/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Divisao
		$scope.find = function() {
			$scope.papel = Papel.query();
		};
	}
]);