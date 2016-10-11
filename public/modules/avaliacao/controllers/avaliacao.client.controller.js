'use strict';

angular.module('avaliacao').controller('AvaliacaoController', ['$scope', '$stateParams', '$location', 'Authentication', 'Avaliacao',
	function($scope, $stateParams, $location, Authentication, Avaliacao) {
		
		$scope.authentication = Authentication;
	  	$scope.currentPage = 1;
	  	$scope.pageSize = 10;
	  	$scope.offset = 0;

	   // Page changed handler
	   $scope.pageChanged = function() {
	  		$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
	   };		  

		// Create new Avaliação
		$scope.create = function() {
			// Create new Avaliação object
			var avaliacao = new Avaliacao ({
				name: this.name,
				description: this.description
			});

			// Redirect after save
			avaliacao.$save(function(response) {
				$location.path('avaliacao/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Avaliacao
		$scope.remove = function(avaliacao) {
			if ( avaliacao ) { 
				avaliacao.$remove();

				for (var i in $scope.avaliacao) {
					if ($scope.avaliacao [i] === avaliacao) {
						$scope.avaliacao.splice(i, 1);
					}
				}
			} else {
				$scope.avaliacao.$remove(function() {
					$location.path('avaliacao');
				});
			}
		};

		// Update existing Avaliacao
		$scope.update = function() {
			var avaliacao = $scope.avaliacao;

			avaliacao.$update(function() {
				$location.path('avaliacao/' + avaliacao._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};		

		// Find a list of Avaliacao
		$scope.find = function() {
			$scope.avaliacao = Avaliacao.query();
		};

		// Find existing Avaliação
		$scope.findOne = function() {
			$scope.avaliacao = Avaliacao.get({ 
				avaliacaoId: $stateParams.avaliacaoId
			});
		};

		// Search for a Avaliação
		$scope.categorySearch = function(product) {
			$location.path('avaliacao/' + product._id);
		};		



	}
]);