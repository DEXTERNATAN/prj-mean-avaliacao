'use strict';

// Papels controller
angular.module('papels').controller('PapelsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Papels',
	function($scope, $stateParams, $location, Authentication, Papels) {
		$scope.authentication = Authentication;

		// Create new Papel
		$scope.create = function() {
			// Create new Papel object
			var papel = new Papels ({
				name: this.name,
				descricao: this.descricao
			});

			// Redirect after save
			papel.$save(function(response) {
				$location.path('papels/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.descricao = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Papel
		$scope.remove = function(papel) {
			if ( papel ) { 
				papel.$remove();

				for (var i in $scope.papels) {
					if ($scope.papels [i] === papel) {
						$scope.papels.splice(i, 1);
					}
				}
			} else {
				$scope.papel.$remove(function() {
					$location.path('papels');
				});
			}
		};

		// Update existing Papel
		$scope.update = function() {
			var papel = $scope.papel;

			papel.$update(function() {
				$location.path('papels/' + papel._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Papels
		$scope.find = function() {
			$scope.papels = Papels.query();
		};

		// Find existing Papel
		$scope.findOne = function() {
			$scope.papel = Papels.get({ 
				papelId: $stateParams.papelId
			});
		};
	}
]);